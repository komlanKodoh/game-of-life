import { next_occurrence } from '../../utils';

import { Directive, NUMBER_MAP, SYMBOL_MAP } from './directive';

export class Reader<TReturn = number | string> {
  current_char_index = -1;
  post_processor?: (next: number | string) => TReturn;

  constructor(private readonly directive: Directive) {}

  /**
   * Returns the next value from the parse {@link Directive};
   */
  next() {
    const char = this.get_next_char();

    let result: string | number | null;

    if (char === null) {
      return null;
    } else if (NUMBER_MAP[char] !== undefined) {
      result = this.next_number();
    } else if (SYMBOL_MAP[char] !== undefined) {
      result = this.next_symbol();
    } else {
      throw new Error(`Invalid character found in directive : ${char}`);
    }

    if (result === null) {
      return null;
    }

    return this.post_process(result);
  }

  /**
   * Adds a post processor to the reader.
   * Every result is passed through the processor.
   * The result returned by the post_processor is then
   * sent to the caller of the function;
   */
  set_post_processor(post_processor: (next: number | string) => TReturn) {
    this.post_processor = post_processor;
    return this;
  }

  /**
   * Utility wrapper over post processor;
   * Executes if function is present else no modification;
   */
  post_process(result: number | string) {
    return this.post_processor ? this.post_processor(result) : result;
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
