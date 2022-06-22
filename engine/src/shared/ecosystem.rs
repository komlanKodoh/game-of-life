use super::cell;

pub trait TEcosystem {
    fn kill(&mut self, row: usize, column: usize);
    fn bless(&mut self, row: usize, column: usize);
    fn toggle(&mut self, row: usize, column: usize);

    fn get_cell_state(&self, row: usize, column: usize) -> cell::State;
    fn get_previous_cell_state(&self, row: usize, column: usize) -> cell::State;

    fn tick(&mut self);

    fn new(&self ,rows: usize, columns: usize) -> Box<dyn TEcosystem>;
}