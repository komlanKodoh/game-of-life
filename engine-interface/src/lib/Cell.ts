/**
 * A cell in the world represented by a tuple;
 * The first index is the row while the second index is the column
 */
type Cell = readonly [row: number, column: number];

namespace Cell {
  /**
   * Describes a cell states at its most basic nature
   *
   */
  export enum PrimaryState {
    Dead = 0,
    Alive = 1,
  }

  /**
   * Creates a cell given its row and column
   */
  export function create(row: number, column: number) {
    return [row, column] as Cell;
  }
}

export default Cell;
