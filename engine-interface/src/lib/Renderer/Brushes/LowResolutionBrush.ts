import Scene from '../Scene';
import { Config } from './../Config';
import Ecosystem from '../../Ecosystem';
import AbstractBrush from './AbstractBrush';

/**
 * scene
 * canvas
 * engine
 *
 */
export default class LowResolutionBrush extends AbstractBrush {
  ctx?: CanvasRenderingContext2D;

  constructor(scene: Scene, engine: Ecosystem, canvas: HTMLCanvasElement) {
    super(scene, engine, canvas);
  }

  render() {
    let ctx = this.get_rendering_context();
    this.wipe_canvas();

    this.engine.for_each_cell((cell, state) => {
      const cell_x = cell[1] * Config.SIZE;
      const cell_y = cell[0] * Config.SIZE;

      if (state === 0 || state === 1) return;

      ctx.fillStyle = this.getFillStyle(state);

      ctx.fillRect(
        this.scene.map_x(cell_x),
        this.scene.map_y(cell_y),
        this.scene.map_dimension(Config.SIZE - Config.PADDING),
        this.scene.map_dimension(Config.SIZE - Config.PADDING)
      );
    });
  }
}
