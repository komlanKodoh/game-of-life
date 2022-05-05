/* tslint:disable */
/* eslint-disable */
/**
*/
export class Universe {
  free(): void;
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
