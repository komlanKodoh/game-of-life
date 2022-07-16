import { BrushConfig } from './../../Configuration/brush.config.type';
import AbstractBrush from './AbstractBrush';

/**
 * scene
 * canvas
 * engine
 *
 */
export default class LowResolutionBrush extends AbstractBrush {
  ctx?: CanvasRenderingContext2D;

  constructor(config: BrushConfig) {
    super(config);
  }

  render() {
    const ctx = this.get_rendering_context();
    const scene = this.config.renderer.scene;

    this.wipe_canvas();

    this.config.renderer.engine.for_each_relevant_cell((cell, state) => {
      const cell_x = cell[1] * this.config.size;
      const cell_y = cell[0] * this.config.size;

      if (state === 0 || state === 1) return;

      ctx.fillStyle = this.get_fill_style(state);

      ctx.fillRect(
        scene.map_x(cell_x),
        scene.map_y(cell_y),
        scene.map_dimension(this.config.size - this.config.padding),
        scene.map_dimension(this.config.size - this.config.padding)
      );
    });
  }
}
