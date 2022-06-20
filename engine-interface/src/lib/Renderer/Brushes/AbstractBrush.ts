import { ObjectMap } from '../../../utils/index.generic';
import Ecosystem from '../../Ecosystem';
import Scene from '../Scene';

export default class AbstractBrush {
  ctx?: CanvasRenderingContext2D;

  constructor(
    protected scene: Scene,
    protected engine: Ecosystem,
    private canvas: HTMLCanvasElement
  ) {}

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

  wipe_canvas() {
    this.get_rendering_context().clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  styleCache: ObjectMap<string, string> = {};
  getFillStyle(state: number) {
    if (this.styleCache[state]) return this.styleCache[state] as string;

    const color = `${state / 2} , ${state / 1.3} , ${state / 1.7}`;
    let fillStyle = `rgba( ${color}, ${state / (255 * 1.5) + 0.2})`;

    if (state === 255) fillStyle = '#0ff55f';

    this.styleCache[state] = fillStyle;

    return fillStyle;
  }
}
