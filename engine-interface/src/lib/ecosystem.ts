import Directive from './Configuration/directive';
import Cell from './cell';
import { Universe } from 'game-of-life';

export default class Ecosystem {
  /**
   * A list of all state live/death present in the current ecosystem;
   */
  state: Uint8Array;
  engine: Universe;

  constructor(private rows: number, private columns: number) {
    this.state = new Uint8Array(rows * columns);
    this.engine = Universe.new(this.state, rows, columns);
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
}
