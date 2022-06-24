use wasm_bindgen::prelude::*;
use super::cell;

#[wasm_bindgen]
pub struct Iterator {
    cells: Vec<i32>,
    idx: usize,
}


impl Iterator {
    pub fn add(&mut self, cell: cell::Cell) {
        self.cells.push(cell.0);
        self.cells.push(cell.1);
    }

    pub fn set_cells(&mut self, cells: Vec<i32>) {
        self.cells = cells;
    }

    pub fn get_cells(&self) -> *const i32 {
        self.cells.as_ptr()
    }
    pub fn get_length(&self) -> usize {
        self.cells.len()
    }
}

#[wasm_bindgen]
impl Iterator {
    pub fn is_empty(&mut self) -> bool {
        if self.idx >= self.cells.len() {
            return true;
        }

        false
    }

    pub fn next(&mut self) {
        self.idx += 2;
    }

    pub fn reset(&mut self) {
        self.idx = 0;
    }

    pub fn get_current_row(&self) -> i32 {
        return self.cells[self.idx];
    }

    pub fn get_current_column(&self) -> i32 {
        return self.cells[self.idx + 1];
    }

    pub fn new() -> Iterator {
        Iterator {
            cells: Vec::new(),
            idx: 0,
        }
    }
}
