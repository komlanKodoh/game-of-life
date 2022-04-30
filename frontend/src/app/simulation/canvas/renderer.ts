import { PanelState } from './../state/panel/reducer';
import { Ecosystem } from 'game-of-life-engine';
import Camera from './camera';
import DragListener from './DragListener';
import PushedListener from './PushedListenner';

interface Config {
  canvas: HTMLCanvasElement;
  engine: Ecosystem;
}

export default class Renderer {
  engine: Ecosystem;
  canvas: HTMLCanvasElement;
  camera = new Camera();
  ctx: CanvasRenderingContext2D | null = null;

  constructor(config: Config) {
    this.engine = config.engine;
    this.canvas = config.canvas;

    this.fitCanvas();
    this.bind(config.canvas);

    window.addEventListener('resize', () => {
      this.fitCanvas();
    });
  }

  bind(binding: HTMLElement) {
    new DragListener(binding, (event) => {
      this.camera.x += event.displacement_x;
      this.camera.y += event.displacement_y;
    });

    let control_key = new PushedListener('Control');

    window.addEventListener('wheel', (event) => {
      if (!control_key.is_pushed) return;

      this.camera.width += event.deltaY ;
      this.camera.height += event.deltaY ;

      this.camera.fit ( this.canvas.width, this.canvas.height)
    });
  }

  fitCanvas() {
    let boundingRect = this.canvas.getBoundingClientRect();

    this.canvas.width = boundingRect.width;
    this.canvas.height = boundingRect.height;

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

  render() {
    let state = this.engine.state;
    let ctx = this.getRenderingContext();

    let SIZE = 15;
    let RADIUS = 2;
    let PADDING = 3;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.engine.for_each_cell((cell, state) => {
      Renderer.rectangle(
        ctx,
        this.camera.map_x(cell[1] * SIZE),
        this.camera.map_y(cell[0] * SIZE),
        this.camera.apply_scale(SIZE - PADDING),
        this.camera.apply_scale(SIZE - PADDING),
        this.camera.apply_scale(RADIUS),
        5
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
