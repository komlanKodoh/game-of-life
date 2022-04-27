import Directive from './Configuration/directive';
import Cell from './cell';
import { Universe } from 'game-of-life';
import { memory } from 'game-of-life/engine_bg.wasm';

export default class Ecosystem {
  /**
   * A list of all state live/death present in the current ecosystem;
   */
  engine: Universe;
  state: Uint8Array;

  constructor(private rows: number, private columns: number) {
    this.engine = Universe.new(rows, columns);
    this.state = new Uint8Array(
      memory.buffer,
      this.engine.get_cells(),
      this.rows * this.columns
    );
  }

  set_rows(rows: number) {
    this.rows = rows;
  }

  set_columns(columns: number) {
    this.columns = columns;
  }

  /**
   * Loads a {@link Directive} into the ecosystem
   */
  add(directive: Directive) {
    const parser = new Directive.Parser();
    parser.feed(directive);

    for (;;) {
      const cell = parser.next_cell();

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
   *
   */
  kill(_cell: Cell) {}

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

  forEachCell(cb: (cell: Cell, state: number) => void) {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let cell = Cell.create(row, column);

        cb(cell, this.get_cell_state(cell) as number);
      }
    }
  }
  
}
