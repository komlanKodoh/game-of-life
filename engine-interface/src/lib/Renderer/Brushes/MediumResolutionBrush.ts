import { Bounds } from '../../../utils/index.generic';
import { BrushConfig } from '../../Configuration/brush.config.type';

import AbstractBrush from './AbstractBrush';

export default class MediumResolutionBrush extends AbstractBrush {
  ctx?: CanvasRenderingContext2D;

  constructor(config: BrushConfig) {
    super(config);
  }

  prepare_living_area() {
    const left = Math.floor(this.config.renderer.scene.x / this.config.size);
    const right = Math.ceil(
      (this.config.renderer.scene.x + this.config.renderer.scene.width) / this.config.size
    );

    const top = Math.floor(this.config.renderer.scene.y / this.config.size);
    const bottom = Math.ceil(
      (this.config.renderer.scene.y + this.config.renderer.scene.height) / this.config.size
    );

    this.paint_grid(
      {
        left,
        right,
        top,
        bottom,
      },
      {
        color: this.get_grid_line_color(),
      }
    );

    this.config.renderer.engine.modifications.forEach((modification) => {
      this.paint_grid(modification.bounds, {
        color: this.config.selection_color
      });
    });
  }

  paint_grid({ left, right, bottom, top }: Bounds, style: { color: string }) {
    const ctx = this.get_rendering_context();

    ctx.beginPath(); // Start a new path

    bottom++;
    right++;

    for (let row = top; row <= bottom; row++) {
      ctx.moveTo(
        this.config.renderer.scene.map_x(left * this.config.size),
        this.config.renderer.scene.map_y(row * this.config.size - this.config.padding / 2)
      ); // Move the pen to (30, 50)
      ctx.lineTo(
        this.config.renderer.scene.map_x(right * this.config.size),
        this.config.renderer.scene.map_y(row * this.config.size - this.config.padding / 2)
      );
    }

    for (let column = left; column <= right; column++) {
      ctx.moveTo(
        this.config.renderer.scene.map_x(column * this.config.size - this.config.padding / 2),
        this.config.renderer.scene.map_y(top * this.config.size)
      ); // Move the pen to (30, 50)
      ctx.lineTo(
        this.config.renderer.scene.map_x(column * this.config.size - this.config.padding / 2),
        this.config.renderer.scene.map_y(bottom * this.config.size)
      );
    }

    ctx.lineWidth = this.config.renderer.scene.map_dimension(this.config.padding);
    ctx.strokeStyle = style.color;
    ctx.stroke();
  }

  render() {
    const ctx = this.get_rendering_context();

    this.wipe_canvas();
    this.prepare_living_area();

    this.config.renderer.engine.for_each_relevant_cell((cell, state) => {
      const cell_x = cell[1] * this.config.size;
      const cell_y = cell[0] * this.config.size;

      if (state === 0 || state === 1) return;

      ctx.fillStyle = this.get_fill_style(state);

      ctx.fillRect(
        this.config.renderer.scene.map_x(cell_x),
        this.config.renderer.scene.map_y(cell_y),
        this.config.renderer.scene.map_dimension(this.config.size - this.config.padding),
        this.config.renderer.scene.map_dimension(this.config.size - this.config.padding)
      );
    });
  }
}
