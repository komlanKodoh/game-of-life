import { BrushConfig } from "../Configuration/brush.config.type";

export const DefaultBrushConfig : Omit< BrushConfig, "renderer"> = {
  size: 20,
  radius: 2,
  padding: 4,

  grid_line_color: "#0a0000",
  canvas_fill_color: "#0a0000",
  selection_color: "#32a0a8",
  cell_shader: (state: number) => {
    const color = `${state / 2} , ${state / 1.3} , ${state / 1.7}`;
    let fillStyle = `rgba( ${color}, ${state / (255 * 1.5) + 0.2})`;

    if (state === 255) fillStyle = '#0ff55f';

    return fillStyle;
  }
};
