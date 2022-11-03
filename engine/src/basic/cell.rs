/// All cells with a state digit equal to
/// The one bellow, are considered alive. All others are considered dead;

pub const LIVING_CELL: u8 = 255;

/// A cell state is represented by an eight bit integer.
/// All living cells have a state of LIVING_CELL. All other values are considered
/// as dead. For dead states, smaller represent cells that died earlier.
/// eg: a cell whose state is 254 just died, while a cell whose state is 200
/// must have died earlier.
pub type State = u8;

/// The position of a given cell in an ecosystem.
/// The first index represent a row number while, the second
/// represent a the column number
pub type Cell = (usize , usize);

/// Return  a new cell described by its position when given a row and column number;
pub fn new(row: usize, column: usize) -> Cell {
    return (row, column) as Cell;
}

pub fn get_next_state(current_state: State, live_neighbors: u8) -> State {
    match (current_state, live_neighbors) {
        (LIVING_CELL, x) if x < 2 => 254,

        (LIVING_CELL, 2) | (LIVING_CELL, 3) => LIVING_CELL,

        (LIVING_CELL, x) if x > 3 => 254,

        (_dead_cell, 3) => LIVING_CELL,

        (dead_cell, _) => {
            if dead_cell > 1 {
                dead_cell - 1
            } else {
                dead_cell
            }
        }
    }
}
    