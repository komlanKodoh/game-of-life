import { BrushConfig } from './lib/Configuration/brush.config.type';
import { AssociativeEcosystem } from 'game-of-life';

import Cell from './lib/Cell';
import Directive from './lib/Configuration/directive';
import {
  DirectiveComposition,
  GameOfLifeConfig,
} from './lib/Configuration/game-of-life.config.type';
import { RenderConfig } from './lib/Configuration/renderer.config.type';
import Ecosystem from './lib/Ecosystem';
import DragListener from './lib/Renderer/Interactions/DragListener';
import Mouse from './lib/Renderer/Interactions/Mouse';
import Renderer, { CellRenderingDirective } from './lib/Renderer/Renderer';
import Scene from './lib/Renderer/Scene';
import Runner from './lib/Runner';
import { Serializer } from './lib/Serializer';
import { Bounds, ObjectMap } from './utils/index.generic';

// modules and functions
export { Ecosystem, Runner, Renderer, Serializer, Scene, Mouse };

// types
export {
  Cell,
  Bounds,
  ObjectMap,
  BrushConfig,
  RenderConfig,
  DragListener,
  GameOfLifeConfig,
  AssociativeEcosystem,
  DirectiveComposition,
  CellRenderingDirective,
};

// namespaces
export { Directive };
