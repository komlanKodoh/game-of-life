"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Pipeline_1 = __importDefault(require("../../utils/Pipeline"));
const cell_1 = __importDefault(require("../cell"));
const Reader_1 = require("./Reader");
class Parser {
    constructor() {
        this.row = 0;
        this.current_reader = null;
        this.directive_registry = {};
        this.pipe = new Pipeline_1.default();
    }
    /**
     * Adds a directive to the list of directive to be parsed;
     */
    feed(directive) {
        this.pipe.add(new Reader_1.Reader(directive));
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
     * Register a directive.
     * Directive registered can be used as embedded directive in
     * main directive passed through the feed method. Directive can
     * be lazily registered but must be registered before being encountered
     * by the parser
     */
    register_directive(name, directive) {
        this.directive_registry[name] = directive;
    }
    /**
     * Returns the current reader or the first available reader in the pipeline.
     * Returns null if the pipeline is empty
     */
    get_current_reader() {
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
    next_instruction() {
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
    process_instruction(instruction) {
        if (typeof instruction === 'string') {
            return this.process_string_instruction(instruction);
        }
        else {
            return this.process_numeric_instruction(instruction);
        }
    }
    /**
     * Parses special key words present in directives;
     * {@link Directive}
     */
    process_string_instruction(instruction) {
        var _a, _b, _c;
        if (instruction === '\n') {
            this.row++;
            return null;
        }
        if (instruction === '->') {
            let target_row = (_a = this.get_current_reader()) === null || _a === void 0 ? void 0 : _a.next_chunk();
            this.row = +target_row;
            return null;
        }
        if (instruction === '-|') {
            let [directive_name, offset_column_as_string] = (_c = (_b = this.get_current_reader()) === null || _b === void 0 ? void 0 : _b.next_chunk()) === null || _c === void 0 ? void 0 : _c.split('.');
            let offset_column = +offset_column_as_string;
            // we send the current reader back to the pipe. so the directive can be
            // directly executed.
            this.pipe.prepend(this.get_current_reader());
            // We modify the set a preprocessor to the directive so every column
            // present in the directive can be rewritten;
            let directive = this.directive_registry[directive_name];
            if (!directive) {
                throw new Error("Nested Directive found while parsing but not registered.");
            }
            ;
            this.current_reader = new Reader_1.Reader(directive).set_post_processor((result) => {
                if (typeof result === 'number') {
                    return result + offset_column;
                }
                return result;
            });
            return null;
        }
        throw new Error(' Passed an unknown instruction ');
    }
    /**
     * Creates a cell from numeric column index with
     * respect to the current row;
     */
    process_numeric_instruction(column) {
        return cell_1.default.create(this.row, column);
    }
}
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9Db25maWd1cmF0aW9uL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvRUFBNEM7QUFDNUMsbURBQTJCO0FBQzNCLHFDQUE2QztBQUk3QyxNQUFhLE1BQU07SUFNakI7UUFMUSxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsbUJBQWMsR0FBbUIsSUFBSSxDQUFDO1FBQ3RDLHVCQUFrQixHQUFpQyxFQUFFLENBQUM7UUFDdEQsU0FBSSxHQUFHLElBQUksa0JBQVEsRUFBVyxDQUFDO0lBRXhCLENBQUM7SUFFaEI7O09BRUc7SUFDSCxJQUFJLENBQUMsU0FBb0I7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxlQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLFNBQVM7WUFDUCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUUxQyxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFakQsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixTQUFTO2FBQ1Y7WUFFRCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGtCQUFrQixDQUFDLElBQVksRUFBRSxTQUFvQjtRQUNuRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7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