import { Universe } from 'game-of-life';
import Cell from './lib/Cell';
import Directive from './lib/Configuration/directive';
import {
  GameOfLifeConfig,
  DirectiveComposition,
} from './lib/Configuration/game-of-life-config.type';

import Ecosystem from './lib/Ecosystem';
import Renderer, {
  Bounds,
  CellRenderingDirective,
  RenderConfig,
} from './lib/Renderer';
import Mouse from './lib/Renderer/Interactions/Mouse';
import Scene from './lib/Renderer/Scene';
import Runner from './lib/Runner';
import { ObjectMap } from './utils/index.generic';

// modules and functions
export { Ecosystem, Runner, Renderer, Scene, Mouse };

// types
export {
  Cell,
  Bounds,
  Universe,
  ObjectMap,
  RenderConfig,
  GameOfLifeConfig,
  DirectiveComposition,
  CellRenderingDirective,
};

// namespaces
export { Directive };
