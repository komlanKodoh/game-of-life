import Pipeline from '../../utils/Pipeline';
import Cell from '../cell';
import { Reader as _Reader } from './Reader';
export class Parser {
    row = 0;
    current_reader = null;
    directive_registry = {};
    pipe = new Pipeline();
    constructor() { }
    /**
     * Adds a directive to the list of directive to be parsed;
     */
    feed(directive) {
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
        if (instruction === '\n') {
            this.row++;
            return null;
        }
        if (instruction === '->') {
            let target_row = this.get_current_reader()?.next_chunk();
            this.row = +target_row;
            return null;
        }
        if (instruction === '-|') {
            let [directive_name, offset_column_as_string] = this.get_current_reader()
                ?.next_chunk()
                ?.split('.');
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
            this.current_reader = new _Reader(directive).set_post_processor((result) => {
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
        return Cell.create(this.row, column);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9Db25maWd1cmF0aW9uL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxTQUFTLENBQUM7QUFDM0IsT0FBTyxFQUFFLE1BQU0sSUFBSSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFJN0MsTUFBTSxPQUFPLE1BQU07SUFDVCxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1IsY0FBYyxHQUFtQixJQUFJLENBQUM7SUFDdEMsa0JBQWtCLEdBQWlDLEVBQUUsQ0FBQztJQUN0RCxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQVcsQ0FBQztJQUV2QyxnQkFBZSxDQUFDO0lBRWhCOztPQUVHO0lBQ0gsSUFBSSxDQUFDLFNBQW9CO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVM7UUFDUCxTQUFTO1lBQ1AsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFMUMsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWpELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsU0FBUzthQUNWO1lBRUQsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsU0FBb0I7UUFD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