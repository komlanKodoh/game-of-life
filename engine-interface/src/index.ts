import { Universe } from 'game-of-life';

import Cell from './lib/Cell';
import Directive from './lib/Configuration/directive';
import {
  DirectiveComposition,
  GameOfLifeConfig,
} from './lib/Configuration/game-of-life-config.type';
import Ecosystem from './lib/Ecosystem';
import Renderer, {
  Bounds,
  CellRenderingDirective,
  RenderConfig,
} from './lib/Renderer';
import DragListener from './lib/Renderer/Interactions/DragListener';
import Mouse from './lib/Renderer/Interactions/Mouse';
import Scene from './lib/Renderer/Scene';
import Runner from './lib/Runner';
import { Serializer } from './lib/Serializer';
import { ObjectMap } from './utils/index.generic';

// modules and functions
export { Ecosystem, Runner, Renderer, Serializer, Scene, Mouse };

// types
export {
  Cell,
  Bounds,
  Universe,
  ObjectMap,
  RenderConfig,
  DragListener,
  GameOfLifeConfig,
  DirectiveComposition,
  CellRenderingDirective,
};

// namespaces
export { Directive };
