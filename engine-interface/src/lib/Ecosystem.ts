import { Universe } from 'game-of-life';
import { memory } from 'game-of-life/engine_bg.wasm';

import { ObjectMap } from '../utils/index.generic';

import Cell from './Cell';
import Directive from './Configuration/directive';
import { GameOfLifeConfig } from './Configuration/game-of-life-config.type';

export default class Ecosystem {
  rows: number;
  columns: number;
  engine: Universe;

  state: Uint8Array;
  parser = new Directive.Parser();

  constructor(config: GameOfLifeConfig) {
    this.rows = config.rows;
    this.columns = config.columns;
    
    this.engine = Universe.new(config.rows, config.columns);

    this.state = new Uint8Array(
      memory.buffer,
      this.engine.get_cells(),
      this.rows * this.columns
    );

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

  register_directives(directives: ObjectMap<string, Directive>) {
    Object.keys(directives).forEach((directive_name) => {
      this.parser.register_directive(
        directive_name,
        directives[directive_name] as string
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

      this.bless(cell);
    }

    console.log ( this.state )
  }

  /**
   * Returns a cell index in the linear world;
   */
  private get_cell_index([_row, _column]: Cell) {
    const row = _row % this.rows;
    const column = _column % this.columns;

    return row * this.columns + column;
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
   * Advance the simulation of one frame;
   */
  next() {
    console.log ( this. state )
    this.engine.tick();
  }

  /**
   * Returns the state of any given cell;
   */
  get_cell_state(cell: Cell) {
    return this.state[this.get_cell_index(cell)];
  }

  /**
   * Iterate over all cells in the universe
   */
  for_each_cell(cb: (cell: Cell, state: number) => void) {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const cell = Cell.create(row, column);

        cb(cell, this.get_cell_state(cell) as number);
      }
    }
  }

  /**
   * Process all cells in the universe and assigns the {@link Cell} PrimaryState returned by the callback;
   */
  process_ecosystem(cb: (cell: Cell, state: number) => boolean) {
    this.for_each_cell((cell, state) => {
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
