use std::collections::HashMap;
use wasm_bindgen::prelude::*;
// use web_sys::console;

use crate::shared::cell::{self, LIVING_CELL};
// use crate::shared::Iterator;
use crate::utils::set_panic_hook;

#[wasm_bindgen]
pub struct AssociativeEcosystem {
    relevant_cells: Vec<i32>,
    cells: HashMap<cell::Cell, cell::State>,
    previous_cells: HashMap<cell::Cell, cell::State>,
}

impl AssociativeEcosystem {
    pub fn diffuse_life(row: i32, column: i32, map: &mut HashMap<cell::Cell, cell::State>) {
        *map.entry((row - 1, column - 1)).or_insert(0) += 1;
        *map.entry((row - 1, column)).or_insert(0) += 1;
        *map.entry((row - 1, column + 1)).or_insert(0) += 1;

        *map.entry((row, column - 1)).or_insert(0) += 1;
        *map.entry((row, column + 1)).or_insert(0) += 1;

        *map.entry((row + 1, column - 1)).or_insert(0) += 1;
        *map.entry((row + 1, column)).or_insert(0) += 1;
        *map.entry((row + 1, column + 1)).or_insert(0) += 1;
    }
}

#[wasm_bindgen]
impl AssociativeEcosystem {
    pub fn get_cell_state(&self, row: i32, column: i32) -> cell::State {
        return self
            .cells
            .get(&cell::new(row, column))
            .unwrap_or(&0)
            .to_owned();
    }

    pub fn get_previous_cell_state(&self, row: i32, column: i32) -> cell::State {
        return self
            .previous_cells
            .get(&cell::new(row, column))
            .unwrap_or(&0)
            .to_owned();
    }

    pub fn kill(&mut self, row: i32, column: i32) {
        let state = self.get_cell_state(row, column);

        self.cells
            .insert(cell::new(row, column), cell::get_next_state(state, 0));
    }

    pub fn bless(&mut self, row: i32, column: i32) {
        let cell_state = self.cells.entry((row , column)).or_insert(0);

        if *cell_state == 0 {
            self.relevant_cells.push(row);
            self.relevant_cells.push(column)
        };

        *cell_state = cell::LIVING_CELL;
    }

    pub fn toggle(&mut self, row: i32, column: i32) {
        match self.get_cell_state(row, column) {
            LIVING_CELL => self.kill(row, column),
            _ => self.bless(row, column),
        }
    }

    pub fn tick(&mut self) {
        let mut relevant_cells = vec![];

        let previous_cells = std::mem::replace(&mut self.cells, HashMap::new());

        for ((row, column), state) in &previous_cells {
            if *state != LIVING_CELL {
                continue;
            };

            AssociativeEcosystem::diffuse_life(*row, *column, &mut self.cells);
        }

        self.cells.retain(|(row, column), live_neighbors| {
            let state = previous_cells.get(&(*row, *column)).unwrap_or(&0);

            let alive = *live_neighbors == 3 || (*state == LIVING_CELL && *live_neighbors == 2);

            match alive {
                true => {
                    *live_neighbors = LIVING_CELL;
                    relevant_cells.push(*row);
                    relevant_cells.push(*column);
                    // console::log_3(&"Cell from wasm ".into(), &(*row).into(), &(*column).into () );
                    return true;
                }
                false => false,
            }
        });

        for (cell, state) in &previous_cells {
            if *state == 1 {
                continue;
            }

            if self.get_cell_state(cell.0, cell.1) != 0 {
                continue;
            };

            relevant_cells.push(*&cell.0);
            relevant_cells.push(*&cell.1);

            // console::log_3(&"Cell from wasm ".into(), &(*cell).0.into(), &(*cell).1.into () );

            self.cells.entry(*cell).or_insert(state - 1);
        }

        self.previous_cells = previous_cells;
        self.relevant_cells = relevant_cells;
    }

    pub fn get_relevant_cells(&self) -> *const i32 {
        return self.relevant_cells.as_ptr();
    }

    pub fn get_relevant_cells_length(&self) -> usize {
        return self.relevant_cells.len();
    }
    pub fn new() -> AssociativeEcosystem {
        set_panic_hook();

        AssociativeEcosystem {
            cells: HashMap::new(),
            previous_cells: HashMap::new(),
            relevant_cells: vec![],
        }
    }
}

#[test]
fn something() {
    let row = 10;
    let column = 8;

    let mut ecosystem = AssociativeEcosystem::new();

    ecosystem.bless(2, 0);
    ecosystem.bless(2, 1);
    ecosystem.bless(2, 2);

    ecosystem.bless(1, 2);
    ecosystem.bless(0, 1);

    for x in 0..row {
        for y in 0..column {
            print!("{} ", ecosystem.get_cell_state(x, y));
        }

        println!();
    }

    ecosystem.tick();
    println!();

    for x in 0..row {
        for y in 0..column {
            print!("{} ", ecosystem.get_cell_state(x, y));
        }

        println!();
    }

    // let mut it = ecosystem.get_relevant_cells();

    // while !it.is_empty() {
    //     println!("{} {}", it.get_current_row(), it.get_current_column());
    //     it.next()
    // }
}
