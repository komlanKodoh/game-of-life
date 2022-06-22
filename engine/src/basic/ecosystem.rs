
use wasm_bindgen::prelude::*;
use crate::{utils::set_panic_hook};

use super::cell;


#[wasm_bindgen]
pub struct Ecosystem {
    columns: usize,
    rows: usize,
    cells: Vec<cell::State>,
    previous_cells: Vec<cell::State>,
}


impl Ecosystem {
    fn get_linear_index(&self, (row, column): cell::Cell) -> usize {
        row * self.columns + column
    }

    fn live_neighbor_count(
        &self,
        (row, column): cell::Cell,
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
impl Ecosystem {
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

    /// Toggle state of given cell position
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

    /// Returns the corresponding previous cell state when invoked with a given cell position for
    pub fn get_previous_cell_state(&self, row: usize, column: usize) -> cell::State {
        let idx = self.get_linear_index((row, column));
        self.previous_cells[idx]
    }

    /// Compute next state of game-of-life simulation
    pub fn tick(&mut self) {
        self.previous_cells = self.cells.clone();

        for row in 0..self.rows {
            for col in 0..self.columns {
                let cell_position = cell::new(row, col);
                let cell_linear_idx = self.get_linear_index(cell_position);

                self.cells[cell_linear_idx] = cell::get_next_state(
                    self.previous_cells[cell_linear_idx],
                    self.live_neighbor_count(cell_position, &self.previous_cells),
                );
            }
        }
    }

    pub fn new(rows: usize, columns: usize) -> Ecosystem {
        set_panic_hook();

        let cells = vec![0; rows * columns];
        let previous_cells = cells.clone();

        Ecosystem {
            columns,
            cells,
            rows,
            previous_cells,
        }
    }
}



#[test]
fn something() {
    let row = 10;
    let column = 8;

    let mut ecosystem = Ecosystem::new(row, column);

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