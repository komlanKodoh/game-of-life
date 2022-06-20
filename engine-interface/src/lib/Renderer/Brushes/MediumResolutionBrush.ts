import Scene from '../Scene';
import { Config } from './../Config';
import Ecosystem from '../../Ecosystem';
import AbstractBrush from './AbstractBrush';

export default class MediumResolutionBrush extends AbstractBrush {
  ctx?: CanvasRenderingContext2D;

  constructor(scene: Scene, engine: Ecosystem, canvas: HTMLCanvasElement) {
    super(scene, engine, canvas);
  }

  prepare_living_area() {
    let ctx = this.get_rendering_context();

    ctx.beginPath(); // Start a new path

    for (let row = 0; row < this.engine.rows; row++) {
      ctx.moveTo(
        this.scene.map_x(0),
        this.scene.map_y(row * Config.SIZE - Config.PADDING / 2)
      ); // Move the pen to (30, 50)
      ctx.lineTo(
        this.scene.map_x(this.engine.columns * Config.SIZE),
        this.scene.map_y(row * Config.SIZE - Config.PADDING / 2)
      );
    }

    for (let column = 0; column < this.engine.columns; column++) {
      ctx.moveTo(
        this.scene.map_x(column * Config.SIZE - Config.PADDING / 2),
        this.scene.map_y(0)
      ); // Move the pen to (30, 50)
      ctx.lineTo(
        this.scene.map_x(column * Config.SIZE - Config.PADDING / 2),
        this.scene.map_y(this.engine.rows * Config.SIZE)
      );
    }

    ctx.lineWidth = this.scene.map_dimension(Config.PADDING);
    // ctx.strokeStyle = "white";
    ctx.stroke();
  }

  render() {
    let ctx = this.get_rendering_context();

    this.wipe_canvas();
    this.prepare_living_area();

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
