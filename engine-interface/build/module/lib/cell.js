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
export default Cell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxJQUFVLElBQUksQ0FnQmI7QUFoQkQsV0FBVSxJQUFJO0lBQ1o7OztPQUdHO0lBQ0gsSUFBWSxZQUdYO0lBSEQsV0FBWSxZQUFZO1FBQ3RCLCtDQUFRLENBQUE7UUFDUixpREFBUyxDQUFBO0lBQ1gsQ0FBQyxFQUhXLFlBQVksR0FBWixpQkFBWSxLQUFaLGlCQUFZLFFBR3ZCO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixNQUFNLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQVMsQ0FBQztJQUMvQixDQUFDO0lBRmUsV0FBTSxTQUVyQixDQUFBO0FBQ0gsQ0FBQyxFQWhCUyxJQUFJLEtBQUosSUFBSSxRQWdCYjtBQUVELGVBQWUsSUFBSSxDQUFDIn0=