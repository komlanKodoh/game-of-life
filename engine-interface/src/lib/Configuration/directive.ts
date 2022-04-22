import { next_occurrence } from '../../utils';
import { ObjectMap } from '../../utils/index.generic';
import Pipeline from '../../utils/Pipeline';
import Cell from '../cell';

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

export class _Reader {
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
   * Return the string content from the current index to the next breaking
   * character;
   */
  next_chunk() {
    return this.next_chunk_before(',');
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

class _Parser {
  private row = 0;

  private current_reader: _Reader | null = null;
  private pipe = new Pipeline<_Reader>();

  constructor() {}

  /**
   * Adds a directive to the list of directive to be parsed;
   */
  feed(directive: Directive) {
    this.pipe.add(new _Reader(directive));
    this.current_reader = this.pipe.next();
  }

  /**
   * Returns the next cell available in the pipe
   */
  next_cell() {
    for (;;) {
      let instruction = this.next_instruction();

      if (instruction === null) {
        return null;
      }

      let cell = this.process_instruction(instruction);

      if (cell === null) {
        continue;
      }

      return cell;
    }
  }

  /**
   * Returns the current reader or the first available reader in the pipeline.
   * Returns null if the pipeline is empty
   */
  private get_current_reader() {
    if (this.current_reader) {
      return this.current_reader;
    }

    return this.pipe.next();
  }

  /**
   * Returns the next instruction available.
   * If the current reader is empty, it automatically moves
   * to the next reader present in the pipe. Returns null if
   * the pipe is empty.
   */
  private next_instruction(): string | number | null {
    let reader = this.get_current_reader();

    if (reader === null) {
      return null;
    }

    let instruction = reader.next();

    if (instruction === null) {
      this.current_reader = this.pipe.next();
      return this.next_instruction();
    }

    return instruction;
  }

  /**
   * Processes instruction return by the Directive reader
   */
  private process_instruction(instruction: string | number) {
    if (typeof instruction === 'string') {
      return this.process_string_instruction(instruction);
    } else {
      return this.process_numeric_instruction(instruction);
    }
  }

  /**
   * Parses special key words present in directives;
   * {@link Directive}
   */
  private process_string_instruction(instruction: string) {
    if (instruction === '\n') {
      this.row++;
      return null;
    }

    if (instruction === '->') {
      let target_row = this.get_current_reader()?.next_chunk() as string;

      this.row = +target_row;
      return null;
    }

    if (instruction === '-|') {
      let target_row = this.get_current_reader()?.next_chunk() as string;

      target_row;
      return null;
    }

    throw new Error(' Passed an unknown instruction ');
  }

  /**
   * Creates a cell from numeric column index with
   * respect to the current row;
   */
  private process_numeric_instruction(column: number) {
    return Cell.create(column, this.row);
  }
}

namespace Directive {
  export class Reader extends _Reader {}

  export class Parser extends _Parser {}
}

export default Directive;
