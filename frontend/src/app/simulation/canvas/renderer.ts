import { PanelState } from './../state/panel/reducer';
import { Ecosystem } from 'game-of-life-engine';

interface Config {
  canvas: HTMLCanvasElement;
  engine: Ecosystem;
}

export default class Renderer {
  canvas: HTMLCanvasElement;
  engine: Ecosystem;
  ctx: CanvasRenderingContext2D | null = null;

  constructor(config: Config) {
    this.engine = config.engine;
    this.canvas = config.canvas;

    this.fitCanvas();

    window.addEventListener('resize', () => {
      this.fitCanvas()
    })
  }

  fitCanvas() {
    let boundingRect = this.canvas.getBoundingClientRect();

    this.canvas.width = boundingRect.width;
    this.canvas.height = boundingRect.height;
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
        cell[1] * SIZE,
        cell[0] * SIZE,
        SIZE - PADDING,
        SIZE - PADDING,
        RADIUS,
        5
      );

      ctx.fillStyle = `rgba( 0,0,0, ${state / (255 * 1.5) + 0.1 })`;
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
