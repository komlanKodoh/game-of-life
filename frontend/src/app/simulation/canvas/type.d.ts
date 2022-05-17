import { Bounds, Directive } from 'game-of-life-engine';

export interface AreaSelectionEvent {
  bounds: Bounds;
  directive: Directive;
}
