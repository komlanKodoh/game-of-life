/* tslint:disable */
/* eslint-disable */
/**
*/
export class Universe {
  free(): void;
/**
* Brings cells at given position back alive
* @param {number} row
* @param {number} column
*/
  bless(row: number, column: number): void;
/**
* kills a living cell
* @param {number} row
* @param {number} column
*/
  kill(row: number, column: number): void;
/**
* Toggle state of given cell position
* @param {number} row
* @param {number} column
*/
  toggle(row: number, column: number): void;
/**
* Returns the corresponding cell state when invoked with a given cell position
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get_cell_state(row: number, column: number): number;
/**
* Returns the corresponding previous cell state when invoked with a given cell position for
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get_previous_cell_state(row: number, column: number): number;
/**
* Compute next state of game-of-life simulation
*/
  tick(): void;
/**
* @param {number} rows
* @param {number} columns
* @returns {Universe}
*/
  static new(rows: number, columns: number): Universe;
}
