

import Renderer, {
  Bounds,
  CellRenderingDirective,
  RenderConfig,
} from './lib/Renderer';
import {
  DirectiveComposition,
  GameOfLifeConfig,
} from './lib/Configuration/game-of-life-config.type';

import Cell from './lib/Cell';
import Runner from './lib/Runner';
import Ecosystem from './lib/Ecosystem';
import { Universe } from 'game-of-life';
import Scene from './lib/Renderer/Scene';
import { Serializer } from './lib/Serializer';
import { ObjectMap } from './utils/index.generic';
import Mouse from './lib/Renderer/Interactions/Mouse';
import Directive from './lib/Configuration/directive';

// modules and functions
export { Ecosystem, Runner, Renderer, Serializer, Scene, Mouse };

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
