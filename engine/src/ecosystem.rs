use std::collections::btree_set::Union;

use wasm_bindgen::prelude::*;

use crate::cell::{self};

#[wasm_bindgen]
pub struct Universe {
    columns: usize,
    rows: usize,
    cells: Vec<cell::State>,
}

impl Universe {
    fn get_linear_index(&self, (row, column): cell::Position) -> usize {
        row * self.columns + column
    }

    /// Returns the corresponding cell state when invoked with a given cell position
    pub fn get_cell_state(&self, cell_position: cell::Position) -> cell::State {
        let idx = self.get_linear_index(cell_position);
        self.cells[idx]
    }

    /// Brings cells at given position back alive
    pub fn bless(&mut self, cell_position: cell::Position) {
        let idx = self.get_linear_index(cell_position);
        self.cells[idx] = cell::LIVING_CELL;
    }

    fn live_neighbor_count(
        &self,
        (row, column): cell::Position,
        snapshot: &Vec<cell::State>,
    ) -> u8 {
        let mut count = 0;

        for delta_row in [self.rows - 1, 0, 1].iter().cloned() {
            for delta_col in [self.columns - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor = (
                    (row + delta_row) % self.rows,
                    (column + delta_col) % self.columns,
                );

                let idx = self.get_linear_index(neighbor);

                let delta_cell_state = snapshot[idx];

                if delta_cell_state == cell::LIVING_CELL {
                    count += 1
                };
            }
        }
        count
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        let snapshot = self.cells.clone();

        for row in 0..self.rows {
            for col in 0..self.columns {
                let cell_position = cell::new_position(row, col);
                let cell_linear_idx = self.get_linear_index(cell_position);

                self.cells[cell_linear_idx] = cell::get_next_state(
                    snapshot[cell_linear_idx],
                    self.live_neighbor_count(cell_position, &snapshot),
                );
            }
        }
    }

    /// Get the list of all cells pointers present in the universe
    pub fn get_cells(&mut self) -> *const u8 {
        self.cells.as_ptr()
    }

    pub fn new(rows: usize, columns: usize) -> Universe {
        let cells = vec![0; rows * columns];

        Universe {
            columns,
            cells,
            rows,
        }
    }
}

#[test]
fn something() {
    let row = 10;
    let column = 8;

    let mut  ecosystem = Universe::new(row, column);

    ecosystem.bless((2,0));
    ecosystem.bless((2,1));
    ecosystem.bless((2,2));

    ecosystem.bless((1,2));
    ecosystem.bless((0,1));

    for x in 0..row {
        println!("{:?}", &ecosystem.cells[x * column..x * column + column]);
    }

    ecosystem.tick();
    println!();

    for x in 0..row {
        println!("{:?}", &ecosystem.cells[x * column..x * column + column]);
    }

}
