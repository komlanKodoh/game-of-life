import { AssociativeEcosystem } from 'game-of-life';
import { memory } from 'game-of-life/engine_bg.wasm';
import { ObjectMap } from '../utils/index.generic';

import Cell from './Cell';
import Directive from './Configuration/directive';
import { GameOfLifeConfig } from './Configuration/game-of-life-config.type';
import { Bounds } from './Renderer';

export default class Ecosystem {
  rows: number;
  columns: number;
  engine: AssociativeEcosystem;

  parser = new Directive.Parser();

  constructor(config: GameOfLifeConfig) {
    this.rows = config.rows;
    this.columns = config.columns;

    this.engine = AssociativeEcosystem.new();

    if (config.is_alive) {
      this.process_ecosystem(config.is_alive);
    }
    if (config.directives) {
      this.register_directives(config.directives);
    }
    if (config.directive_composition) {
      this.integrate_directive(config.directive_composition);
    }
  }

  set_rows(rows: number) {
    this.rows = rows;
  }

  set_columns(columns: number) {
    this.columns = columns;
  }

  /** Register directive than can then be used in main directive composition */
  register_directive(name: string, directive: Directive) {
    this.parser.register_directive(name, directive);
  }

  /** register a group of rendering directive ( component ) that can then be used
   * in the main directive composition.
   */
  register_directives(directives: ObjectMap<string, Directive>) {
    Object.keys(directives).forEach((directive_name) => {
      this.parser.register_directive(
        directive_name,
        directives[directive_name] as Directive
      );
    });
  }

  /**
   * Loads a {@link Directive} into the ecosystem
   */
  integrate_directive(directive: Directive) {
    this.parser.feed(directive);

    for (;;) {
      const cell = this.parser.next_cell();

      if (cell === null) {
        break;
      }

      this.bless(Cell.create(cell[0] % this.rows, cell[1] % this.columns));
    }
  }

  /**
   * Brings a cell back to live
   */
  bless(cell: Cell) {
    this.engine.bless(...cell);
  }

  /**
   * Kills a living cell
   */
  kill(cell: Cell) {
    this.engine.kill(...cell);
  }

  /**
   * Toggle a cell between alive and dead state
   */
  toggle(cell: Cell) {
    this.engine.toggle(...cell);
  }

  /**
   * Advance the simulation of one frame;
   */
  next() {
    this.engine.tick();
  }

  /**
   * Returns the state of any given cell;
   */
  get_cell_state(cell: Cell) {
    return this.engine.get_cell_state(...cell);
  }

  /**
   * Returns the state of a given cell at the previous iteration
   */

  public get_previous_cell_state(cell: Cell) {
    return this.engine.get_previous_cell_state(...cell);
  }

  /**
   * Iterate over all cells in the universe that are either alive or present residual state
   */
  for_each_relevant_cell(cb: (cell: Cell, state: number) => void) {
    let iterator = this.engine.get_relevant_cells();
    let length = this.engine.get_relevant_cells_length();

    let relevant_cells = new Int32Array(memory.buffer, iterator, length);

    for (let first_idx = 0; first_idx < relevant_cells.length; first_idx += 2) {
      const cell = [
        relevant_cells[first_idx] as number,
        relevant_cells[first_idx + 1] as number,
      ] as const;

      cb(cell, this.get_cell_state(cell) as number);
    }
  }

  /**
   * Iterate over all cells in the universe within the specified range
   */
  for_each_cell(cb: (cell: Cell, state: number) => void, bounds?: Bounds) {
    if (!bounds) {
      bounds = {
        top: 0,
        bottom: this.rows - 1,

        left: 0,
        right: this.columns - 1,
      };
    }

    for (let row = bounds.top; row <= bounds.bottom; row++) {
      for (let column = bounds.left; column <= bounds.right; column++) {
        const cell = [row, column] as const;

        cb(cell, this.get_cell_state(cell) as number);
      }
    }
  }
  /**
   * Process all cells in the universe and assigns the {@link Cell} PrimaryState returned by the callback;
   */
  process_ecosystem(cb: (cell: Cell, state: number) => boolean) {
    this.for_each_relevant_cell((cell, state) => {
      const is_alive = cb(cell, state);

      if (is_alive) {
        this.bless(cell);
      }
      if (!is_alive) {
        this.kill(cell);
      }
    });
  }
}
