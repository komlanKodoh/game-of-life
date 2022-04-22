import { next_occurrence } from '../../utils';
import { ObjectMap } from '../../utils/index.generic';

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
type Directive = string;

/**
 * Mapping from string numbers to integer number;
 * The map includes a comma, as it is used as a number separator
 */
const NUMBER_MAP: ObjectMap<string, number | false> = {
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
const SYMBOL_MAP: ObjectMap<string, boolean> = {
  ',': true,
  '->': true,
  '\n': true,
  '-': false,
  '-|': true,
};

namespace Directive {
  export class Parser {
    current_char_index = -1;

    constructor(private readonly directive: Directive) {}

    /**
     * Returns the next value from the parse {@link Directive};
     */
    next() {
      const char = this.get_next_char();

      if (char === null) {
        return null;
      } else if (NUMBER_MAP[char] !== undefined) {
        return this.next_number();
      } else if (SYMBOL_MAP[char] !== undefined) {
        return this.next_symbol();
      } else {
        throw new Error(`Invalid character found in directive : ${char}`);
      }
    }

    /**
     * Reads the string until the target character is reached;
     */
    next_chunk_before(target: string) {
      const start = this.current_char_index + 1;
      const end = next_occurrence(this.directive, target, start);

      this.current_char_index = end || this.directive.length;

      return end ? this.directive.slice(start, end) : null;
    }

    /**
     * Finds the next number from the parse {@link Directive}
     */
    private next_number() {
      this.current_char_index++;

      const start = this.current_char_index;
      let end = this.current_char_index + 1;

      while (this.next_integer() !== null) {
        end++;
      }

      return +this.directive.slice(start, end);
    }

    /**
     * Returns the next symbol from the parse {@link Directive}
     */
    private next_symbol() {
      let char = this.next_char();
      if (char === null) {
        return null;
      }
      for (;;) {
        if (SYMBOL_MAP[char] === undefined) {
          throw new Error(`Invalid symbol found in directive : ${char}`);
        }

        if (SYMBOL_MAP[char] === true) {
          return char;
        }

        char += this.next_char();
      }
    }

    /**
     * Returns the next integer from the parsed {@link Directive}
     */
    private next_integer(): number | null {
      const char = this.next_char();

      if (char === null) {
        return null;
      }

      if (NUMBER_MAP[char] === undefined) {
        throw new Error(`Invalid integer found in directive : ${char}`);
      }

      return NUMBER_MAP[char] as number;
    }

    /**
     * Returns the next character from the parsed {@link Directive},
     * and update the pointer to the following position
     */
    private next_char() {
      const char = this.get_next_char();
      this.current_char_index++;
      return char;
    }

    /**
     * Returns the first non-white space character from the parsed {@link Directive},
     * It updates te current char index every time a white space character is encountered.
     */
    private get_next_char() {
      let char: string | null;

      for (;;) {
        char = this.directive[this.current_char_index + 1] ?? null;

        if (char !== ' ') {
          break;
        }

        this.current_char_index++;
      }

      if (char === ',') {
        return null;
      }

      return char;
    }
  }
}

export default Directive;
