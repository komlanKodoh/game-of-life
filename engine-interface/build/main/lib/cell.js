"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell;
(function (Cell) {
    /**
     * Describes a cell states at its most basic nature
     *
     */
    let PrimaryState;
    (function (PrimaryState) {
        PrimaryState[PrimaryState["Dead"] = 0] = "Dead";
        PrimaryState[PrimaryState["Alive"] = 1] = "Alive";
    })(PrimaryState = Cell.PrimaryState || (Cell.PrimaryState = {}));
    /**
     * Creates a cell given its row and column
     */
    function create(row, column) {
        return [row, column];
    }
    Cell.create = create;
})(Cell || (Cell = {}));
exports.default = Cell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLElBQVUsSUFBSSxDQWdCYjtBQWhCRCxXQUFVLElBQUk7SUFDWjs7O09BR0c7SUFDSCxJQUFZLFlBR1g7SUFIRCxXQUFZLFlBQVk7UUFDdEIsK0NBQVEsQ0FBQTtRQUNSLGlEQUFTLENBQUE7SUFDWCxDQUFDLEVBSFcsWUFBWSxHQUFaLGlCQUFZLEtBQVosaUJBQVksUUFHdkI7SUFFRDs7T0FFRztJQUNILFNBQWdCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUNoRCxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBUyxDQUFDO0lBQy9CLENBQUM7SUFGZSxXQUFNLFNBRXJCLENBQUE7QUFDSCxDQUFDLEVBaEJTLElBQUksS0FBSixJQUFJLFFBZ0JiO0FBRUQsa0JBQWUsSUFBSSxDQUFDIn0=