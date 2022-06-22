/* tslint:disable */
/* eslint-disable */
/**
*/
export class AssociativeEcosystem {
  free(): void;
/**
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get_cell_state(row: number, column: number): number;
/**
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get_previous_cell_state(row: number, column: number): number;
/**
* @param {number} row
* @param {number} column
*/
  kill(row: number, column: number): void;
/**
* @param {number} row
* @param {number} column
*/
  bless(row: number, column: number): void;
/**
* @param {number} row
* @param {number} column
*/
  toggle(row: number, column: number): void;
/**
*/
  tick(): void;
/**
* @returns {number}
*/
  get_relevant_cells(): number;
/**
* @returns {number}
*/
  get_relevant_cells_length(): number;
/**
* @returns {AssociativeEcosystem}
*/
  static new(): AssociativeEcosystem;
}
/**
*/
export class Ecosystem {
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
* @returns {Ecosystem}
*/
  static new(rows: number, columns: number): Ecosystem;
}
/**
*/
export class Iterator {
  free(): void;
/**
* @returns {boolean}
*/
  is_empty(): boolean;
/**
*/
  next(): void;
/**
*/
  reset(): void;
/**
* @returns {number}
*/
  get_current_row(): number;
/**
* @returns {number}
*/
  get_current_column(): number;
/**
* @returns {Iterator}
*/
  static new(): Iterator;
}
