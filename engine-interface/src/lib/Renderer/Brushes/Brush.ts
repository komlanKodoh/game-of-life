import { BrushConfig } from "../../Configuration/brush.config.type";
import Renderer from "../Renderer";

export interface Brush {
  setConfig(config: BrushConfig): void ;
  render(renderer: Renderer): void;
}
