import Directive from './Configuration/directive';
import Cell from './cell';
import { Universe } from 'game-of-life';
import { memory } from 'game-of-life/engine_bg.wasm';
import { GameOfLifeConfig } from './game-of-life-config.type';
import { ObjectMap } from '../utils/index.generic';

export default class Ecosystem {
  /**
   * A list of all state live/death present in the current ecosystem;
   */
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
  }

  /**
   * Returns a cell index in the linear world;
   */
  private get_cell_index([_row, _column]: Cell) {
    let row = _row % this.rows;
    let column = _column % this.columns;

    return row * this.rows + column;
  }

  /**
   * Brings a cell back to live
   */
  bless(cell: Cell) {
    let idx = this.get_cell_index(cell);

    this.state.set([255], idx);
  }

  /**
   * Kills a living cell
   */
  kill(cell: Cell) {
    let idx = this.get_cell_index(cell);
    this.state.set([254], idx);
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
    return this.state[this.get_cell_index(cell)];
  }

  for_each_cell(cb: (cell: Cell, state: number) => void) {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let cell = Cell.create(row, column);

        cb(cell, this.get_cell_state(cell) as number);
      }
    }
  }

  process_ecosystem(cb: (cell: Cell, state: number) => boolean) {
    this.for_each_cell((cell, state) => {
      let is_alive = cb(cell, state);

      if (is_alive) {
        this.bless(cell);
      }
      if (!is_alive) {
        this.kill(cell);
      }
    });
  }
}
