import { Directive } from './directive';
export declare class Reader<TReturn = number | string> {
    private readonly directive;
    current_char_index: number;
    post_processor?: (next: number | string) => TReturn;
    constructor(directive: Directive);
    /**
     * Returns the next value from the parse {@link Directive};
     */
    next(): string | number | TReturn | null;
    /**
     * Adds a post processor to the reader.
     * Every result is passed through the processor.
     * The result returned by the post_processor is then
     * sent to the caller of the function;
     */
    set_post_processor(post_processor: (next: number | string) => TReturn): this;
    /**
     * Utility wrapper over post processor;
     * Executes if function is present else no modification;
     */
    post_process(result: number | string): string | number | TReturn;
    /**
     * Return the string content from the current index to the next breaking
     * character;
     */
    next_chunk(): string | null;
    /**
     * Reads the string until the target character is reached;
     */
    next_chunk_before(target: string): string | null;
    /**
     * Finds the next number from the parse {@link Directive}
     */
    private next_number;
    /**
     * Returns the next symbol from the parse {@link Directive}
     */
    private next_symbol;
    /**
     * Returns the next integer from the parsed {@link Directive}
     */
    private next_integer;
    /**
     * Returns the next character from the parsed {@link Directive},
     * and update the pointer to the following position
     */
    private next_char;
    /**
     * Returns the first non-white space character from the parsed {@link Directive},
     * It updates te current char index every time a white space character is encountered.
     */
    private get_next_char;
}
