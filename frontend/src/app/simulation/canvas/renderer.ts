import { PanelState } from './../state/panel/reducer';
import { Ecosystem } from 'game-of-life-engine';
import Scene from './Scene';
import DragListener from './DragListener';
import PushedListener from './PushedListenner';
import Mouse from './Mouse';
import Keyboard from './Keyboard';
import { to_pixel, sort_number } from 'src/utils';
import Cell from 'game-of-life-engine/build/main/lib/cell';

interface Config {
  canvas: HTMLCanvasElement;
  engine: Ecosystem;
}

export type Bounds = {
  vertical_low: number;
  vertical_high: number;
  horizontal_low: number;
  horizontal_high: number;
};

type CellRenderingDirective = (
  cell: Cell,
  ctx: CanvasRenderingContext2D
) => false | (() => void);

export default class Renderer {
  mouse!: Mouse;
  engine: Ecosystem;
  canvas: HTMLCanvasElement;

  scene = new Scene();
  ctx: CanvasRenderingContext2D | null = null;
  cell_rendering_directive?: CellRenderingDirective;

  SIZE = 15;
  RADIUS = 2;
  PADDING = 3;

  constructor(config: Config) {
    this.engine = config.engine;
    this.canvas = config.canvas;

    this.bind(config.canvas);

    this.fitCanvas();

    window.addEventListener('resize', () => {
      this.fitCanvas();
    });
  }

  bind(binding: HTMLElement) {
    this.mouse = new Mouse(this.scene, this.canvas);

    this.configure_zoom_control();
    this.configure_drag_behavior();
    this.configure_select_behavior();
    this.configure_cell_state_control();
  }

  private configure_zoom_control() {
    window.addEventListener('wheel', (event) => {
      if (!Keyboard.keys_pushed.has('Control')) return;

      this.living_area_is_valid = false;

      let delta = event.deltaY;
      let previousWidth = this.scene.width;
      let previousHeight = this.scene.height;

      if (previousWidth + delta < 10 * this.SIZE) {
        return;
      }

      this.scene.resize(previousWidth + delta);

      this.scene.x =
        this.mouse.x -
        (this.scene.width * (this.mouse.x - this.scene.x)) / previousWidth;

      this.scene.y =
        this.mouse.y -
        (this.scene.height * (this.mouse.y - this.scene.y)) / previousHeight;

      this.scene.fit(this.canvas.width, this.canvas.height);
    });
  }

  private configure_cell_state_control() {
    window.addEventListener('click', () => {
      let cell_column = Math.floor(this.mouse.x / this.SIZE);
      let cell_row = Math.floor(this.mouse.y / this.SIZE);

      let cell: Cell = [cell_row, cell_column];

      if (this.engine.get_cell_state(cell) === 255) {
        this.engine.kill(cell);
      } else {
        this.engine.bless(cell);
      }
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
  }

  private configure_drag_behavior() {
    new DragListener(this.canvas, (event) => {
      if (event.modifiers.size > 0) {
        return;
      }
      this.scene.x +=
        (event.displacement_x * this.scene.width) / this.canvas.width;
      this.scene.y +=
        (event.displacement_y * this.scene.height) / this.canvas.height;
    });
  }

  on_select?: (arg: { bounds: Bounds; done: boolean }) => void;
  private configure_select_behavior() {
    let start_x = 0;
    let start_y = 0;

    let selector = document.createElement('div');
    selector.classList.add('canvas-cell-selector');
    this.canvas.parentNode?.appendChild(selector);

    const get_relevant_cells = (
      vertical_bounds: [number, number],
      horizontal_bounds: [number, number]
    ) => {
      let cell_start_row = Math.floor(Math.min(...vertical_bounds) / this.SIZE);
      let cell_start_column = Math.floor(
        Math.min(...horizontal_bounds) / this.SIZE
      );

      let cell_end_row = Math.ceil(Math.max(...vertical_bounds) / this.SIZE);
      let cell_end_column = Math.ceil(
        Math.max(...horizontal_bounds) / this.SIZE
      );

      let relevant_cells: Cell[] = [];

      for (let row = cell_start_row; row <= cell_end_row; row++) {
        for (
          let column = cell_start_column;
          column <= cell_end_column;
          column++
        ) {
          relevant_cells.push([row, column]);
        }
      }

      return relevant_cells;
    };

    new DragListener(this.canvas, (event) => {
      if (!event.modifiers.has('Control')) return;

      let vertical_bounds = [event.drag_star_x, event.x];
      let horizontal_bounds = [event.drag_star_y, event.y];

      Object.assign(selector.style, {
        opacity: 1,
        position: 'fixed',

        top: to_pixel(Math.min(...horizontal_bounds)),
        left: to_pixel(Math.min(...vertical_bounds)),
      });

      selector.style.width = to_pixel(Math.abs(-event.x + event.drag_star_x));
      selector.style.height = to_pixel(Math.abs(-event.y + event.drag_star_y));

      let [vertical_low, vertical_high] = sort_number([start_x, this.mouse.x]);

      let [horizontal_low, horizontal_high] = sort_number([
        start_y,
        this.mouse.y,
      ]);

      let bounds: Bounds = {
        horizontal_low: this.to_cell_coordinate(horizontal_low),
        horizontal_high: this.to_cell_coordinate(horizontal_high),
        vertical_low: this.to_cell_coordinate(vertical_low),
        vertical_high: this.to_cell_coordinate(vertical_high),
      };

      this.on_select &&
        this.on_select({
          bounds,
          done: false,
        });
    })
      .onDragStart(() => {
        start_x = this.mouse.x;
        start_y = this.mouse.y;
      })
      .onDragEnd(() => {
        if (!Keyboard.keys_pushed.has('Control')) return;

        let [vertical_low, vertical_high] = sort_number([
          start_x,
          this.mouse.x,
        ]);
        let [horizontal_low, horizontal_high] = sort_number([
          start_y,
          this.mouse.y,
        ]);

        let bounds: Bounds = {
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
  }

  fitCanvas() {
    this.living_area_is_valid = false;

    let { width, height } = this.canvas.getBoundingClientRect();

    this.canvas.width = width;
    this.canvas.height = height;

    this.scene.width = width;
    this.scene.height = height;

    this.scene.resize(this.engine.columns * this.SIZE);

    this.scene.x = (this.engine.columns * this.SIZE - this.scene.width) / 2;
    this.scene.y = (this.engine.rows * this.SIZE - this.scene.height) / 2;

    this.scene.fit_width(this.canvas.width);

    this.render();
  }

  getRenderingContext() {
    if (this.ctx) {
      return this.ctx;
    }

    let maybe_ctx = this.canvas.getContext('2d');

    if (!maybe_ctx) {
      throw new Error('Could not initialize context');
    }

    this.ctx = maybe_ctx;
    return this.ctx;
  }

  living_area_canvas?: HTMLCanvasElement;
  living_area_is_valid: boolean = false;
  private prepare_living_area() {
    if (!this.living_area_canvas || !this.living_area_is_valid) {
      this.living_area_canvas = document.createElement('canvas');
      let ctx = this.living_area_canvas.getContext(
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

        let cell_x = cell[1] * this.SIZE;
        let cell_y = cell[0] * this.SIZE;

        // if (!this.scene.isWithin(cell_x, cell_y)) {
        //   return;
        // }

        Renderer.rectangle(
          ctx,
          this.scene.map_dimension(cell_x),
          this.scene.map_dimension(cell_y),
          this.scene.map_dimension(this.SIZE - this.PADDING),
          this.scene.map_dimension(this.SIZE - this.PADDING),
          this.scene.map_dimension(this.RADIUS),
          this.scene.map_dimension(5)
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
    let ctx = this.getRenderingContext();

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.lineWidth = this.scene.map_dimension(this.SIZE / 10);

    this.prepare_living_area();

    this.engine.for_each_cell((cell, state) => {
      let cell_x = cell[1] * this.SIZE;
      let cell_y = cell[0] * this.SIZE;

      // if ( !this.scene.isWithin( cell_x, cell_y) ) { return };

      let post_process =
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
        this.scene.map_dimension(this.RADIUS),
        this.scene.map_dimension(5)
      );

    let color = `${state /2 } , ${state /1.3} , ${state / 1.7}`
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
    radius: number,
    padding: number
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
