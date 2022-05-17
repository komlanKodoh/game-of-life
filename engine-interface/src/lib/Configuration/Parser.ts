import Queue from '../../utils/Queue';
import { ObjectMap } from '../../utils/index.generic';
import Cell from '../Cell';

import { Reader as _Reader } from './Reader';
import { Directive } from './directive';

/**
 * Helps parse a directive and transform into instruction meaningful to the game-of-life engine
 */
export class Parser {
  private row = 0;
  private current_reader: _Reader | null = null;
  private directive_registry: ObjectMap<string, Directive> = {};
  private pipe = new Queue<_Reader>();

  /**
   * Adds a directive to the queue of directive to be parsed;
   */
  feed(directive: Directive) {
    this.pipe.add(new _Reader(directive));
    this.current_reader = this.pipe.next();
  }

  /** Returns the next cell available in the pipe */
  next_cell() {
    for (;;) {
      const instruction = this.next_instruction();

      if (instruction === null) {
        return null;
      }

      const cell = this.process_instruction(instruction);

      if (cell === null) {
        continue;
      }

      return cell;
    }
  }

  /**
   * Register a directive.
   * Directive registered can be used as embedded directive in
   * main directive passed through the feed method. Directive can
   * be lazily registered but must be registered before being encountered
   * by the parser
   */
  register_directive(name: string, directive: Directive) {
    this.directive_registry[name] = directive;
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
    const reader = this.get_current_reader();

    if (reader === null) {
      return null;
    }

    const instruction = reader.next();

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
      const target_row = this.get_current_reader()?.next_chunk() as string;

      this.row = +target_row;
      return null;
    }

    if (instruction === '-|') {
      const [directive_name, offset_column_as_string] =
        this.get_current_reader()?.next_chunk()?.split('.') as [string, string];

      const offset_column = +offset_column_as_string;

      // we send the current reader back to the pipe. so the directive can be
      // directly executed.
      this.pipe.prepend(this.get_current_reader() as _Reader<string | number>);

      // We modify the set a preprocessor to the directive so every column
      // present in the directive can be rewritten;

      const directive = this.directive_registry[directive_name];

      if (!directive) {
        throw new Error(
          'Nested Directive found while parsing but not registered.'
        );
      }

      this.current_reader = new _Reader(directive).set_post_processor(
        (result) => {
          if (typeof result === 'number') {
            return result + offset_column;
          }

          return result;
        }
      );

      return null;
    }

    throw new Error(' Passed an unknown instruction ');
  }

  /**
   * Creates a cell from numeric column index with
   * respect to the current row;
   */
  private process_numeric_instruction(column: number) {
    return Cell.create(this.row, column);
  }
}
