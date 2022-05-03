"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
const utils_1 = require("../../utils");
const directive_1 = require("./directive");
class Reader {
    constructor(directive) {
        this.directive = directive;
        this.current_char_index = -1;
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
        else if (directive_1.NUMBER_MAP[char] !== undefined) {
            result = this.next_number();
        }
        else if (directive_1.SYMBOL_MAP[char] !== undefined) {
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
        const end = (0, utils_1.next_occurrence)(this.directive, target, start);
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
            if (directive_1.SYMBOL_MAP[char] === undefined) {
                throw new Error(`Invalid symbol found in directive : ${char}`);
            }
            if (directive_1.SYMBOL_MAP[char] === true) {
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
        if (directive_1.NUMBER_MAP[char] === undefined) {
            throw new Error(`Invalid integer found in directive : ${char}`);
        }
        return directive_1.NUMBER_MAP[char];
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
        var _a;
        let char;
        for (;;) {
            char = (_a = this.directive[this.current_char_index + 1]) !== null && _a !== void 0 ? _a : null;
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
exports.Reader = Reader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9Db25maWd1cmF0aW9uL1JlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBOEM7QUFDOUMsMkNBQWdFO0FBRWhFLE1BQWEsTUFBTTtJQUlqQixZQUE2QixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSGpELHVCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRzRCLENBQUM7SUFFckQ7O09BRUc7SUFDSCxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRWxDLElBQUksTUFBOEIsQ0FBQztRQUVuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksc0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjthQUFNLElBQUksc0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNuRTtRQUVELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUFrQixDQUFDLGNBQWtEO1FBQ25FLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxN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