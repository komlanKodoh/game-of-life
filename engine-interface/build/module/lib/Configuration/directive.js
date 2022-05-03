import { Parser as _Parser } from './Parser';
import { Reader as _Reader } from './Reader';
/**
 * Mapping from string numbers to integer number;
 * The map includes a comma, as it is used as a number separator
 */
export const NUMBER_MAP = {
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
export const SYMBOL_MAP = {
    ',': true,
    '->': true,
    '\n': true,
    '-': false,
    '-|': true,
};
export var Directive;
(function (Directive) {
    class Reader extends _Reader {
    }
    Directive.Reader = Reader;
    class Parser extends _Parser {
    }
    Directive.Parser = Parser;
})(Directive || (Directive = {}));
export default Directive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9Db25maWd1cmF0aW9uL2RpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxJQUFJLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxJQUFJLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQW1DN0M7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFzQztJQUMzRCxHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxLQUFLO0lBQ1YsR0FBRyxFQUFFLEtBQUs7Q0FDWCxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQStCO0lBQ3BELEdBQUcsRUFBRSxJQUFJO0lBQ1QsSUFBSSxFQUFFLElBQUk7SUFDVixJQUFJLEVBQUUsSUFBSTtJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsSUFBSSxFQUFFLElBQUk7Q0FDWCxDQUFDO0FBRUYsTUFBTSxLQUFXLFNBQVMsQ0FJekI7QUFKRCxXQUFpQixTQUFTO0lBQ3hCLE1BQWEsTUFBTyxTQUFRLE9BQU87S0FBRztJQUF6QixnQkFBTSxTQUFtQixDQUFBO0lBRXRDLE1BQWEsTUFBTyxTQUFRLE9BQU87S0FBRztJQUF6QixnQkFBTSxTQUFtQixDQUFBO0FBQ3hDLENBQUMsRUFKZ0IsU0FBUyxLQUFULFNBQVMsUUFJekI7QUFFRCxlQUFlLFNBQVMsQ0FBQyJ9