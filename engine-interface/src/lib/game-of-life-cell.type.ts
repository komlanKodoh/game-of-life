/**
 * A cell in the world represented by a tuple;
 * The first index is the row while the second index is the column
 */
export type Cell = [row: number, column: number];

/**
 * Describes a cell states at its most basic nature
 *
 */
export enum PrimaryCellState {
  Dead = 0,
  Alive = 1,
}
