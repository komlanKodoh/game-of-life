import Cell from './Cell';
import Directive from './Configuration/directive';
import Ecosystem from './Ecosystem';
import { Bounds } from './Renderer';

export class Serializer {
  static generate_string_directive(engine: Ecosystem, bounds?: Bounds) {
    let directive: Directive = '';

    let current_row = bounds?.top || 0;

    engine.for_each_relevant_cell((cell: Cell, state: number) => {
      if (current_row !== cell[0]) {
        // if (cell[0] - current_row > 1) directive += `->${cell[0]} `;
        directive += '\n';

        current_row = cell[0];
      }

      if (state !== 255) return;

      directive += cell[1] - (bounds?.left || 0) + ',';
    }, bounds);

    return directive;
  }
}
