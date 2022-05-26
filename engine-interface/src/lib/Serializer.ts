import Cell from './Cell';
import Ecosystem from './Ecosystem';
import { Bounds } from './Renderer';
import Directive from './Configuration/directive';

export class Serializer {
  constructor() {}

  static generate_string_directive(engine: Ecosystem, bounds?: Bounds) {
    let directive: Directive = '';

    let current_row = bounds?.horizontal_low || 0;

    engine.for_each_cell((cell: Cell, state: number) => {
      if (state !== 255) return;

      if (current_row !== cell[0]) {
        directive += '\n';
        current_row = cell[0];
      }

      directive += cell[1] - (bounds?.vertical_low || 0) + ',';
    }, bounds);

    return directive;
  }
  
}
