import Ecosystem from "../Ecosystem";

import { BrushConfig } from "./brush.config.type";

/** Renderer configuration */
export interface RenderConfig {
    canvas: HTMLCanvasElement;
    engine: Ecosystem;
    brush?: Omit< BrushConfig, "renderer" >
  }
  