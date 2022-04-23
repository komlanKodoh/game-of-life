import { ObjectMap } from '../../utils/index.generic';
import { _Parser } from './_Parser';
import { _Reader } from './_Reader';

/**
 * A rendering directive used by the renderer to compute cells
 *  state to compute the state of the cells;
 *
 * ### Example Directive : world { rows: 10, columns; 10 }
 *
 * ```ts
 * let directive = `
 * ->2 1, 4, 6, 2, 9
 * ->6 5
 * ->9 9, 5, 6
 * `.trim()
 * ```
 * 
 * ### Basics
 * 
 * Every live ( separated by a \n represents) a new columns in the
 * simulation. For any given column, all declared indexes are considered
 * alive. 
 * 
 * ### Special Characters 
 * 
 * ### jump command ( ->row )
 * 
 * Any time character is encountered the parser jumps to the given row. This
 * After the jump, the parsing continues from the current row. This
 * 

 * > Note : The row is not reset to the initial row after the given is completed
 * 
 */
export type Directive = string;

/**
 * Mapping from string numbers to integer number;
 * The map includes a comma, as it is used as a number separator
 */
export const NUMBER_MAP: ObjectMap<string, number | false> = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  ',': false,
  ' ': false,
};

/**
 * A list of all symbols that a Directive can possibly include
 */
export const SYMBOL_MAP: ObjectMap<string, boolean> = {
  ',': true,
  '->': true,
  '\n': true,
  '-': false,
  '-|': true,
};

export namespace Directive {
  export class Reader extends _Reader {}

  export class Parser extends _Parser {}
}

export default Directive;
