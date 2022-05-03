import { next_occurrence } from '../../utils';
import { NUMBER_MAP, SYMBOL_MAP } from './directive';
export class Reader {
    directive;
    current_char_index = -1;
    post_processor;
    constructor(directive) {
        this.directive = directive;
    }
    /**
     * Returns the next value from the parse {@link Directive};
     */
    next() {
        const char = this.get_next_char();
        let result;
        if (char === null) {
            return null;
        }
        else if (NUMBER_MAP[char] !== undefined) {
            result = this.next_number();
        }
        else if (SYMBOL_MAP[char] !== undefined) {
            result = this.next_symbol();
        }
        else {
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
    set_post_processor(post_processor) {
        this.post_processor = post_processor;
        return this;
    }
    /**
     * Utility wrapper over post processor;
     * Executes if function is present else no modification;
     */
    post_process(result) {
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
    next_chunk_before(target) {
        const start = this.current_char_index + 1;
        const end = next_occurrence(this.directive, target, start);
        this.current_char_index = end || this.directive.length;
        return end ? this.directive.slice(start, end) : null;
    }
    /**
     * Finds the next number from the parse {@link Directive}
     */
    next_number() {
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
    next_symbol() {
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
    next_integer() {
        const char = this.next_char();
        if (char === null) {
            return null;
        }
        if (NUMBER_MAP[char] === undefined) {
            throw new Error(`Invalid integer found in directive : ${char}`);
        }
        return NUMBER_MAP[char];
    }
    /**
     * Returns the next character from the parsed {@link Directive},
     * and update the pointer to the following position
     */
    next_char() {
        const char = this.get_next_char();
        this.current_char_index++;
        return char;
    }
    /**
     * Returns the first non-white space character from the parsed {@link Directive},
     * It updates te current char index every time a white space character is encountered.
     */
    get_next_char() {
        let char;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9Db25maWd1cmF0aW9uL1JlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBYSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWhFLE1BQU0sT0FBTyxNQUFNO0lBSVk7SUFIN0Isa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEIsY0FBYyxDQUFzQztJQUVwRCxZQUE2QixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQztJQUVyRDs7T0FFRztJQUNILElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFbEMsSUFBSSxNQUE4QixDQUFDO1FBRW5DLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDN0I7YUFBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNuRTtRQUVELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUFrQixDQUFDLGNBQWtEO1FBQ25FLElB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