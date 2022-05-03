import Cell from '../cell';
import { Directive } from './directive';
export declare class Parser {
    private row;
    private current_reader;
    private directive_registry;
    private pipe;
    constructor();
    /**
     * Adds a directive to the list of directive to be parsed;
     */
    feed(directive: Directive): void;
    /**
     * Returns the next cell available in the pipe
     */
    next_cell(): Cell | null;
    /**
     * Register a directive.
     * Directive registered can be used as embedded directive in
     * main directive passed through the feed method. Directive can
     * be lazily registered but must be registered before being encountered
     * by the parser
     */
    register_directive(name: string, directive: Directive): void;
    /**
     * Returns the current reader or the first available reader in the pipeline.
     * Returns null if the pipeline is empty
     */
    private get_current_reader;
    /**
     * Returns the next instruction available.
     * If the current reader is empty, it automatically moves
     * to the next reader present in the pipe. Returns null if
     * the pipe is empty.
     */
    private next_instruction;
    /**
     * Processes instruction return by the Directive reader
     */
    private process_instruction;
    /**
     * Parses special key words present in directives;
     * {@link Directive}
     */
    private process_string_instruction;
    /**
     * Creates a cell from numeric column index with
     * respect to the current row;
     */
    private process_numeric_instruction;
}
