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
*/
  tick(): void;
/**
* Get the list of all cells pointers present in the universe
* @returns {number}
*/
  get_cells(): number;
/**
* @param {number} rows
* @param {number} columns
* @returns {Universe}
*/
  static new(rows: number, columns: number): Universe;
}
