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
*/
  tick(): void;
/**
* @param {number} rows
* @param {number} columns
* @returns {Universe}
*/
  static new(rows: number, columns: number): Universe;
}
