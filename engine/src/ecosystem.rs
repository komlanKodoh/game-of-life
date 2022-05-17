use wasm_bindgen::prelude::*;
use web_sys::console;

use crate::{
    cell::{self},
    utils::set_panic_hook,
};

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
    /// Brings cells at given position back alive
    pub fn bless(&mut self, row: usize, column: usize) {
        let idx = self.get_linear_index((row, column));
        self.cells[idx] = cell::LIVING_CELL;
    }

    /// kills a living cell
    pub fn kill(&mut self, row: usize, column: usize) {
        let idx = self.get_linear_index((row, column));
        self.cells[idx] = cell::get_next_state(self.cells[idx], 0);
    }

    pub fn toggle(&mut self, row: usize, column: usize) {
        let idx = self.get_linear_index((row, column));

        if self.cells[idx] == 255 {
            self.cells[idx] = 0;
        } else {
            self.cells[idx] = 255;
        }
    }

    /// Returns the corresponding cell state when invoked with a given cell position
    pub fn get_cell_state(&self, row: usize, column: usize) -> cell::State {
        let idx = self.get_linear_index((row, column));
        self.cells[idx]
    }

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

    pub fn new(rows: usize, columns: usize) -> Universe {
        set_panic_hook();

        let cells = vec![0; rows * columns];
        
        console::log_1(&cells.len().to_string().into());
        console::log_1 ( &rows.to_string().into());
        console::log_1( &columns.to_string().into() );
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

    let mut ecosystem = Universe::new(row, column);

    ecosystem.bless(2, 0);
    ecosystem.bless(2, 1);
    ecosystem.bless(2, 2);

    ecosystem.bless(1, 2);
    ecosystem.bless(0, 1);

    for x in 0..row {
        println!("{:?}", &ecosystem.cells[x * column..x * column + column]);
    }

    ecosystem.tick();
    println!();

    for x in 0..row {
        println!("{:?}", &ecosystem.cells[x * column..x * column + column]);
    }
}
