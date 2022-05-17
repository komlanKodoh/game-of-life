import { sort_number, to_pixel } from '../../utils';
import Cell from '../Cell';
import Ecosystem from '../Ecosystem';

import DragListener from './Interactions/DragListener';
import Keyboard from './Interactions/Keyboard';
import Mouse from './Interactions/Mouse';
import Scene from './Scene';

/** Renderer configuration */
export interface RenderConfig {
  canvas: HTMLCanvasElement;
  engine: Ecosystem;
}

export type Bounds = {
  vertical_low: number;
  vertical_high: number;
  horizontal_low: number;
  horizontal_high: number;
};

/** Change cell rendering behaviors by manipulation render context */
export type CellRenderingDirective = (
  cell: Cell,
  ctx: CanvasRenderingContext2D
) => false | (() => void);

export default class Renderer {
  mouse: Mouse;
  engine: Ecosystem;
  canvas: HTMLCanvasElement;

  scene = new Scene();
  ctx: CanvasRenderingContext2D | null = null;
  cell_rendering_directive?: CellRenderingDirective;

  SIZE = 15;
  RADIUS = 2;
  PADDING = 3;

  constructor(config: RenderConfig) {
    this.engine = config.engine;
    this.canvas = config.canvas;

    this.fitCanvas();
    this.mouse = new Mouse(this.scene, this.canvas);

    window.addEventListener('resize', () => {
      this.fitCanvas();
    });
  }

  /** Configures all canvas interactions including :
   * - zoom;
   * - drag;
   * - select;
   * - cell state toggle;
   */
  bind_all() {

    this.configure_zoom_control();
    this.configure_drag_behavior();
    this.configure_select_behavior();
    this.configure_cell_state_control();
  }

  /** Configures scene zoom controls and behaviors */
  configure_zoom_control() {
    window.addEventListener('wheel', (event) => {
      if (!Keyboard.keys_pushed.has('Control')) return;

      this.living_area_is_valid = false;

      const delta = event.deltaY;
      const previousWidth = this.scene.width;
      const previousHeight = this.scene.height;

      if (previousWidth + delta < 10 * this.SIZE) {
        return;
      }

      this.scene.resize(previousWidth + delta);

      // Refocus of the scene on current mouse position;
      this.scene.x =
        this.mouse.x -
        (this.scene.width * (this.mouse.x - this.scene.x)) / previousWidth;

      this.scene.y =
        this.mouse.y -
        (this.scene.height * (this.mouse.y - this.scene.y)) / previousHeight;

      this.scene.fit(this.canvas.width, this.canvas.height);
    });

    return this;
  }

  /** configure toggle between dead/alive cell state; */
  configure_cell_state_control() {
    let skip_click = 0;

     new DragListener(this.canvas, () => null ).onDragStart(() => {
      skip_click ++;
    });

    window.addEventListener('click', () => {
      if ( skip_click > 0 ){
        skip_click --
        return;
      }

      const cell_column = Math.floor(this.mouse.x / this.SIZE) % this.engine.columns;
      const cell_row = Math.floor(this.mouse.y / this.SIZE) % this.engine.rows;

      this.engine.toggle( [cell_row, cell_column] )

    });

    new DragListener(this.canvas, (event) => {
      if (!event.modifiers.has('Shift')) {
        return;
      }

      this.engine.bless([
        this.to_cell_coordinate(this.mouse.y),
        this.to_cell_coordinate(this.mouse.x),
      ]);
    });

    return this;
  }

  /** Configures canvas drag behaviors and listeners : double-tap and mouse movement  */
  configure_drag_behavior() {
    new DragListener(this.canvas, (event) => {
      if (event.modifiers.size > 0) {
        return;
      }
      this.scene.x +=
        (event.displacement_x * this.scene.width) / this.canvas.width;
      this.scene.y +=
        (event.displacement_y * this.scene.height) / this.canvas.height;
    });

    return this
  }

  on_select?: (arg: { bounds: Bounds; done: boolean }) => void;
  configure_select_behavior() {
    let start_x = 0;
    let start_y = 0;

    const selector = document.createElement('div');

    selector.style.opacity = '0';
    selector.classList.add('canvas-cell-selector');
    this.canvas.parentNode?.appendChild(selector);

    new DragListener(this.canvas, (event) => {
      if (!event.modifiers.has('Control')) return;

      const vertical_bounds = [event.drag_star_x, event.x];
      const horizontal_bounds = [event.drag_star_y, event.y];

      Object.assign(selector.style, {
        opacity: 1,
        position: 'fixed',

        top: to_pixel(Math.min(...horizontal_bounds)),
        left: to_pixel(Math.min(...vertical_bounds)),
      });

      selector.style.width = to_pixel(Math.abs(-event.x + event.drag_star_x));
      selector.style.height = to_pixel(Math.abs(-event.y + event.drag_star_y));

      // const [v_low, v_high] = sort_number([start_x, this.mouse.x]);
      // const [h_low, h_high] = sort_number([start_y, this.mouse.y]);

      // const bounds: Bounds = {
      //   horizontal_low: this.to_cell_coordinate(h_low),
      //   horizontal_high: this.to_cell_coordinate(h_high),

      //   vertical_low: this.to_cell_coordinate(v_low),
      //   vertical_high: this.to_cell_coordinate(v_high),
      // };

      // this.on_select &&
      //   this.on_select({
      //     bounds,
      //     done: false,
      //   });
    })
      .onDragStart(() => {
        start_x = this.mouse.x;
        start_y = this.mouse.y;
      })
      .onDragEnd(({modifiers }) => {

        if (!modifiers.has('Control')) return;

        const [vertical_low, vertical_high] = sort_number([
          start_x,
          this.mouse.x,
        ]);

        const [horizontal_low, horizontal_high] = sort_number([
          start_y,
          this.mouse.y,
        ]);

        const bounds: Bounds = {
          horizontal_low: this.to_cell_coordinate(horizontal_low),
          horizontal_high: this.to_cell_coordinate(horizontal_high),

          vertical_low: this.to_cell_coordinate(vertical_low),
          vertical_high: this.to_cell_coordinate(vertical_high),
        };

        this.on_select &&
          this.on_select({
            bounds,
            done: true,
          });
      });

    window.addEventListener('click', () => {
      Object.assign(selector.style, {
        opacity: 0,
        width: '0px',
        height: '0px',
      });
    });

    return this;
  }

  /**
   * Every time we call this function we invalidate the rerendered living area as it is likely that,
   * the scene will change in size.
   */
  fitCanvas() {
    this.living_area_is_valid = false;

    const { width, height } = this.canvas.getBoundingClientRect();

    // Resize the canvas to have the same real dimension as its real css rendered dimensions;
    this.canvas.width = width;
    this.canvas.height = height;

    // Assign scene width to current canvas width and scene heigh to current canvas height;
    // the actual value are irrelevant and this action helps the scene and the canvas have the
    // same aspect ratio. We will in the following line resize the scene so that it has the same
    // width as the engine.
    this.scene.width = width;
    this.scene.height = height;

    // fit the scene to have same width as engine width
    this.scene.resize(this.engine.columns * this.SIZE);

    // center scene on both y and x axis
    this.scene.x = (this.engine.columns * this.SIZE - this.scene.width) / 2;
    this.scene.y = (this.engine.rows * this.SIZE - this.scene.height) / 2;

    this.scene.fit_width(this.canvas.width);

    this.render();
  }

  /** Returns canvas rendering context */
  getRenderingContext() {
    if (this.ctx) {
      return this.ctx;
    }

    const maybe_ctx = this.canvas.getContext('2d');

    if (!maybe_ctx) {
      throw new Error('Could not initialize context');
    }

    this.ctx = maybe_ctx;
    return this.ctx;
  }

  living_area_canvas?: HTMLCanvasElement;
  living_area_is_valid = false;
  private prepare_living_area() {
    if (!this.living_area_canvas || !this.living_area_is_valid) {
      this.living_area_canvas = document.createElement('canvas');
      const ctx = this.living_area_canvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D;

      this.living_area_canvas.width = this.scene.map_dimension(
        this.engine.columns * this.SIZE
      );
      this.living_area_canvas.height = this.scene.map_dimension(
        this.engine.columns * this.SIZE
      );

      this.engine.for_each_cell((cell, state) => {
        if (state !== 0) {
          return;
        }

        const cell_x = cell[1] * this.SIZE;
        const cell_y = cell[0] * this.SIZE;

        Renderer.rectangle(
          ctx,
          this.scene.map_dimension(cell_x),
          this.scene.map_dimension(cell_y),
          this.scene.map_dimension(this.SIZE - this.PADDING),
          this.scene.map_dimension(this.SIZE - this.PADDING),
          this.scene.map_dimension(this.RADIUS)
        );

        ctx.fillStyle = `rgba( 0 ,0,0, 0.1)`;

        ctx.fill();
      });

      this.living_area_is_valid = true;
    }

    this.getRenderingContext().drawImage(
      this.living_area_canvas,
      this.scene.map_x(0),
      this.scene.map_y(0)
    );
  }

  render() {
    const ctx = this.getRenderingContext();

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.lineWidth = this.scene.map_dimension(this.SIZE / 10);

    this.prepare_living_area();

    this.engine.for_each_cell((cell, state) => {
      const cell_x = cell[1] * this.SIZE;
      const cell_y = cell[0] * this.SIZE;

      const post_process =
        (this.cell_rendering_directive &&
          this.cell_rendering_directive(cell, ctx)) ||
        false;

      if (state === 0 && !post_process) {
        return;
      }

      Renderer.rectangle(
        ctx,
        this.scene.map_x(cell_x),
        this.scene.map_y(cell_y),
        this.scene.map_dimension(this.SIZE - this.PADDING),
        this.scene.map_dimension(this.SIZE - this.PADDING),
        this.scene.map_dimension(this.RADIUS)
      );

      const color = `${state / 2} , ${state / 1.3} , ${state / 1.7}`;
      ctx.fillStyle = `rgba( ${color}, ${state / (255 * 1.5) + 0.2})`;

      if (state === 255) {
        ctx.fillStyle = '#0ff55f';
      }

      ctx.fill();

      post_process && post_process();
    });
  }

  private static rectangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  to_cell_coordinate(coordinate: number) {
    return Math.floor(coordinate / this.SIZE);
  }
}
