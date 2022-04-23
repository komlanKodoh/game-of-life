
import Directive from './Configuration/directive';
import Cell from './cell';

export default class Ecosystem {
  /**
   * A list of all state live/death present in the current ecosystem;
   */
   state: Uint8Array;

  constructor(private width: number, private height: number) {
    this.state = new Uint8Array(width * height);
  }

  set_width(width: number) {
    this.width = width;
  }

  set_height(height: number) {
    this.height
    this.state
    this.height = height;
  }

  /**
   * Returns a cell index in the linear world;
   */
  get_cell_index([row, column]: Cell) {
    return row * this.width + column;
  }

  add(directive: Directive) {
    const parser = new Directive.Parser();
    parser.feed ( directive )

    for (;;) {
      const cell = parser.next_cell();

      if (cell === null ) {
        break;
      }

      this.bless ( cell )
    }

  }

  bless( cell: Cell){
    let idx = this.get_cell_index( cell );
    
    this.state.set ( [255], idx )
  }


}
