import { ObjectMap } from '../../../utils/index.generic';
import { BrushConfig } from '../../Configuration/brush.config.type';
export default class AbstractBrush {
  ctx?: CanvasRenderingContext2D;

  constructor(protected config: BrushConfig) {}

  /** Returns canvas rendering context */
  get_rendering_context() {
    if (this.ctx) {
      return this.ctx;
    }

    const maybe_ctx = this.config.renderer.canvas.getContext('2d');

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
      this.config.renderer.canvas.width,
      this.config.renderer.canvas.height
    );
  }

  get_grid_line_color() {
    return this.config.grid_line_color;
  }

  styleCache: ObjectMap<string, string> = {};
  get_fill_style(state: number) {
    if (this.styleCache[state]) return this.styleCache[state] as string;

      return this.styleCache[state] = this.config.cell_shader(state);
  }
}
