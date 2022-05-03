"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directive = exports.SYMBOL_MAP = exports.NUMBER_MAP = void 0;
const Parser_1 = require("./Parser");
const Reader_1 = require("./Reader");
/**
 * Mapping from string numbers to integer number;
 * The map includes a comma, as it is used as a number separator
 */
exports.NUMBER_MAP = {
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
exports.SYMBOL_MAP = {
    ',': true,
    '->': true,
    '\n': true,
    '-': false,
    '-|': true,
};
var Directive;
(function (Directive) {
    class Reader extends Reader_1.Reader {
    }
    Directive.Reader = Reader;
    class Parser extends Parser_1.Parser {
    }
    Directive.Parser = Parser;
})(Directive = exports.Directive || (exports.Directive = {}));
exports.default = Directive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9Db25maWd1cmF0aW9uL2RpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBNkM7QUFDN0MscUNBQTZDO0FBbUM3Qzs7O0dBR0c7QUFDVSxRQUFBLFVBQVUsR0FBc0M7SUFDM0QsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsS0FBSztJQUNWLEdBQUcsRUFBRSxLQUFLO0NBQ1gsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxVQUFVLEdBQStCO0lBQ3BELEdBQUcsRUFBRSxJQUFJO0lBQ1QsSUFBSSxFQUFFLElBQUk7SUFDVixJQUFJLEVBQUUsSUFBSTtJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsSUFBSSxFQUFFLElBQUk7Q0FDWCxDQUFDO0FBRUYsSUFBaUIsU0FBUyxDQUl6QjtBQUpELFdBQWlCLFNBQVM7SUFDeEIsTUFBYSxNQUFPLFNBQVEsZUFBTztLQUFHO0lBQXpCLGdCQUFNLFNBQW1CLENBQUE7SUFFdEMsTUFBYSxNQUFPLFNBQVEsZUFBTztLQUFHO0lBQXpCLGdCQUFNLFNBQW1CLENBQUE7QUFDeEMsQ0FBQyxFQUpnQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUl6QjtBQUVELGtCQUFlLFNBQVMsQ0FBQyJ9