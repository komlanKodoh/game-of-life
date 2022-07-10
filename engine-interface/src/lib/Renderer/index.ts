import { sort_number, to_pixel } from '../../utils';
import Cell from '../Cell';
import Ecosystem from '../Ecosystem';
import { isWithinBounds } from '../Util';
import { Brush } from './Brushes/Brush';
import MediumResolutionBrush from './Brushes/MediumResolutionBrush';

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
  left: number;
  right: number;
  top: number;
  bottom: number;
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

  SIZE = 20;
  RADIUS = 2;
  PADDING = 4;

  brush: Brush;

  constructor(config: RenderConfig) {
    this.engine = config.engine;
    this.canvas = config.canvas;
    this.brush = new MediumResolutionBrush(
      this.scene,
      this.engine,
      this.canvas
    );

    this.fitCanvas();
    this.mouse = new Mouse(this.scene, this.canvas);

    window.addEventListener('resize', () => {
      this.fitCanvas();
    });
  }

  /** Returns the cell currently hovered by the mouse */
  get_hovered_cell(): Cell | null {
    const cell_column = Math.floor(this.mouse.x / this.SIZE);

    const cell_row = Math.floor(this.mouse.y / this.SIZE);

    const cell: Cell = [cell_row, cell_column];

    if (!isWithinBounds(cell, this.get_bounds())) return null;

    return cell;
  }

  /** Configures all canvas interactions including :
   * - zoom;
   * - drag;
   * - select;
   * - cell state toggle;
   */
  bind_all() {
    this.configure_zoom_control();
    this.configure_scroll_behavior();
    this.configure_select_behavior();
    this.configure_cell_state_control();
  }

  /** Configures scene zoom controls and behaviors */
  configure_zoom_control() {
    window.addEventListener('wheel', (event) => {
      if (!Keyboard.keys_pushed.has('Control')) return;
      this.zoom(event.deltaY, true);
    });

    return this;
  }

  /** Control camera position */
  zoom(deltaValue: number, focus_mouse: boolean) {
    // this.living_area_is_valid = false;

    let delta = Math.floor(deltaValue);
    const previousWidth = this.scene.width;
    const previousHeight = this.scene.height;
    const min_scene_width = 10 * this.SIZE;

    if (previousWidth + delta < min_scene_width) {
      if (previousWidth === min_scene_width) return;

      delta = min_scene_width - previousWidth;
    }

    this.scene.resize(previousWidth + delta);

    if (focus_mouse) {
      // Refocus of the scene on current mouse position;
      this.scene.x =
        this.mouse.x -
        (this.scene.width * (this.mouse.x - this.scene.x)) / previousWidth;

      this.scene.y =
        this.mouse.y -
        (this.scene.height * (this.mouse.y - this.scene.y)) / previousHeight;
    } else {
      this.scene.x =
        this.scene.x +
        this.scene.width / 2 -
        (this.scene.width * (this.scene.width / 2)) / previousWidth;

      this.scene.y =
        this.scene.y +
        this.scene.height / 2 -
        (this.scene.height * (this.scene.height / 2)) / previousHeight;
    }

    this.scene.fit(this.canvas.width, this.canvas.height);
  }

  /** configure toggle between dead/alive cell state; */
  configure_cell_state_control() {
    let skip_click = 0;

    new DragListener(this.canvas, () => null).onDragStart(() => {
      skip_click++;
    });

    this.canvas.addEventListener('click', () => {
      if (skip_click > 0) {
        skip_click--;
        return;
      }

      const cell_column = Math.floor(this.mouse.x / this.SIZE);

      const cell_row = Math.floor(this.mouse.y / this.SIZE);

      const cell: Cell = [cell_row, cell_column];

      // if (!isWithinBounds(cell, this.get_bounds())) return;

      console.log(
        ' State : ',
        this.engine.get_cell_state(cell),
        ' cell : ',
        cell
      );

      this.engine.toggle([cell_row, cell_column]);
    });

    new DragListener(this.canvas, (event) => {
      if (event.modifiers.size > 0) return;

      this.engine.bless([
        this.to_cell_coordinate(this.mouse.y),
        this.to_cell_coordinate(this.mouse.x),
      ]);
    });

    return this;
  }

  get_bounds(): Bounds {
    return {
      top: 0,
      bottom: this.engine.rows - 1,

      left: 0,
      right: this.engine.columns - 1,
    };
  }

  /** Configures canvas drag behaviors and listeners : double-tap and mouse movement  */
  configure_scroll_behavior() {
    window.addEventListener('wheel', (event) => {
      if (Keyboard.keys_pushed.size > 0) return;

      this.scene.x += (event.deltaX * this.scene.width) / this.canvas.width;
      this.scene.y += (event.deltaY * this.scene.height) / this.canvas.height;
    });

    return this;
  }

  on_select?: (arg: { bounds: Bounds; done: boolean }) => void;
  configure_select_behavior() {
    let start_x = 0;
    let start_y = 0;

    const selector = document.createElement('div');

    selector.style.opacity = '0';
    selector.style.pointerEvents = 'none';
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
    })
      .onDragStart(() => {
        start_x = this.mouse.x;
        start_y = this.mouse.y;
      })
      .onDragEnd(({ modifiers }) => {
        if (!modifiers.has('Control')) return;

        const [left, right] = sort_number([start_x, this.mouse.x]);

        const [top, bottom] = sort_number([start_y, this.mouse.y]);

        const bounds: Bounds = {
          top: this.to_cell_coordinate(top),
          bottom: this.to_cell_coordinate(bottom),

          left: this.to_cell_coordinate(left),
          right: this.to_cell_coordinate(right),
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
  get_rendering_context() {
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

  // living_area_canvas?: HTMLCanvasElement;
  // living_area_is_valid = false;
  // private prepare_living_area() {
  //   if (!this.living_area_canvas || !this.living_area_is_valid) {
  //     this.living_area_canvas = document.createElement('canvas');
  //     const ctx = this.living_area_canvas.getContext(
  //       '2d'
  //     ) as CanvasRenderingContext2D;

  //     this.living_area_canvas.width = this.scene.map_dimension(
  //       this.engine.columns * this.SIZE
  //     );
  //     this.living_area_canvas.height = this.scene.map_dimension(
  //       this.engine.rows * this.SIZE
  //     );

  //     const visible_area =
  //       (this.scene.width * this.scene.height) / (this.SIZE * this.SIZE);

  //     if (visible_area > 90000) return;

  //     this.engine.for_each_cell((cell, state) => {
  //       if (state !== 0) {
  //         return;
  //       }

  //       const cell_x = cell[1] * this.SIZE;
  //       const cell_y = cell[0] * this.SIZE;

  //       // Renderer.rectangle(
  //       //   ctx,
  //       //   this.scene.map_dimension(cell_x),
  //       //   this.scene.map_dimension(cell_y),
  //       //   this.scene.map_dimension(this.SIZE - this.PADDING),
  //       //   this.scene.map_dimension(this.SIZE - this.PADDING),
  //       //   this.scene.map_dimension(this.RADIUS)
  //       // );

  //       ctx.fillRect(
  //         this.scene.map_dimension(cell_x),
  //         this.scene.map_dimension(cell_y),
  //         this.scene.map_dimension(this.SIZE - this.PADDING),
  //         this.scene.map_dimension(this.SIZE - this.PADDING)
  //       );

  //       ctx.fillStyle = `rgba( 0 ,0,0, 0.1)`;

  //       ctx.fill();
  //     });

  //     this.living_area_is_valid = true;
  //   }

  //   this.get_rendering_context().drawImage(
  //     this.living_area_canvas,
  //     this.scene.map_x(0),
  //     this.scene.map_y(0)
  //   );
  // }

  render() {
    this.brush.render();
  }

  // private static rectangle(
  //   ctx: CanvasRenderingContext2D,
  //   x: number,
  //   y: number,
  //   width: number,
  //   height: number,
  //   radius: number
  // ) {
  //   ctx.beginPath();
  //   ctx.moveTo(x + radius, y);
  //   ctx.lineTo(x + width - radius, y);
  //   ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  //   ctx.lineTo(x + width, y + height - radius);
  //   ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  //   ctx.lineTo(x + radius, y + height);
  //   ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  //   ctx.lineTo(x, y + radius);
  //   ctx.quadraticCurveTo(x, y, x + radius, y);
  //   ctx.closePath();
  // }

  to_cell_coordinate(coordinate: number) {
    return Math.floor(coordinate / this.SIZE);
  }
}
