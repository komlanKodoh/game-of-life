import { PanelState } from './../state/panel/reducer';
import { Ecosystem } from 'game-of-life-engine';
import Scene from './Scene';
import DragListener from './DragListener';
import PushedListener from './PushedListenner';
import Mouse from './Mouse';

interface Config {
  canvas: HTMLCanvasElement;
  engine: Ecosystem;
}

export default class Renderer {
  engine: Ecosystem;
  canvas: HTMLCanvasElement;
  scene = new Scene();
  mouse!: Mouse;
  ctx: CanvasRenderingContext2D | null = null;

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
    let control_key = new PushedListener('Control');
    let shift_key = new PushedListener('Shift');

    this.mouse = new Mouse(this.scene, this.canvas);

    new DragListener(binding, (event) => {
      if (shift_key.is_pushed) {
      }

      this.scene.x +=
        (event.displacement_x * this.scene.width) / this.canvas.width;
      this.scene.y +=
        (event.displacement_y * this.scene.height) / this.canvas.height;
    });

    window.addEventListener('wheel', (event) => {
      if (!control_key.is_pushed) return;

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

    window.addEventListener('click', () => {
      let cell_column = Math.floor(this.mouse.x / 15);
      let cell_row = Math.floor(this.mouse.y / 15);

      this.engine.bless([cell_row, cell_column]);
    });
  }

  fitCanvas() {
    let { width, height } = this.canvas.getBoundingClientRect();

    this.canvas.width = width;
    this.canvas.height = height;

    this.scene.width = width ;
    this.scene.height = height ;

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
  prepare_living_area() {
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

        Renderer.rectangle(
          ctx,
          this.scene.map_dimension(cell[1] * this.SIZE),
          this.scene.map_dimension(cell[0] * this.SIZE),
          this.scene.map_dimension(this.SIZE - this.PADDING),
          this.scene.map_dimension(this.SIZE - this.PADDING),
          this.scene.map_dimension(this.RADIUS),
          this.scene.map_dimension(5)
        );

        ctx.fillStyle = `rgba( 0 ,0,0, 0.1)`;

        ctx.fill();
      });
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
    this.prepare_living_area();

    this.engine.for_each_cell((cell, state) => {
      if (state === 0) {
        return;
      }

      Renderer.rectangle(
        ctx,
        this.scene.map_x(cell[1] * this.SIZE),
        this.scene.map_y(cell[0] * this.SIZE),
        this.scene.map_dimension(this.SIZE - this.PADDING),
        this.scene.map_dimension(this.SIZE - this.PADDING),
        this.scene.map_dimension(this.RADIUS),
        this.scene.map_dimension(5)
      );

      ctx.fillStyle = `rgba( 0,0,0, ${state / (255 * 1.5) + 0.1})`;
      if (state === 255) {
        ctx.fillStyle = '#4e4eca';
      }

      ctx.fill();
    });
  }

  static rectangle(
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
}
