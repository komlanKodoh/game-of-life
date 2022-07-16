import Renderer from "../Renderer";

export interface Brush {
  render(renderer: Renderer): void;
}
