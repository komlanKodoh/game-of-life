import { Universe } from 'game-of-life';
import { ObjectMap } from '../utils/index.generic';

import Cell from './Cell';
import Directive from './Configuration/directive';
import { GameOfLifeConfig } from './Configuration/game-of-life-config.type';
import { Bounds } from './Renderer';

export default class Ecosystem {
  rows: number;
  columns: number;
  engine: Universe;

  parser = new Directive.Parser();

  constructor(config: GameOfLifeConfig) {
    this.rows = config.rows;
    this.columns = config.columns;

    this.engine = Universe.new(config.rows, config.columns);


    if (config.is_alive) {
      this.process_ecosystem(config.is_alive);
    }
    if (config.directives) {
      this.register_directives(config.directives);
    }
    if (config.directive_composition) {
      this.integrate_directive(config.directive_composition);
    }
  }

  set_rows(rows: number) {
    this.rows = rows;
  }

  set_columns(columns: number) {
    this.columns = columns;
  }

  register_directives(directives: ObjectMap<string, Directive>) {
    Object.keys(directives).forEach((directive_name) => {
      this.parser.register_directive(
        directive_name,
        directives[directive_name] as string
      );
    });
  }

  /**
   * Loads a {@link Directive} into the ecosystem
   */
  integrate_directive(directive: Directive) {
    this.parser.feed(directive);

    for (;;) {
      const cell = this.parser.next_cell();

      if (cell === null) {
        break;
      }

      this.bless(cell);
    }
  }

  /**
   * Brings a cell back to live
   */
  bless(cell: Cell) {
    this.engine.bless(...cell);
  }

  /**
   * Kills a living cell
   */
  kill(cell: Cell) {
    this.engine.kill(...cell);
  }

  /**
   * Toggle a cell between alive and dead state
   */
  toggle(cell: Cell){
    this.engine.toggle(...cell)
  }

  /**
   * Advance the simulation of one frame;
   */
  next() {
    this.engine.tick();
  }

  /**
   * Returns the state of any given cell;
   */
  private get_cell_state(cell: Cell) {
    return this.engine.get_cell_state(...cell);
  }

  /**
   * Iterate over all cells in the universe
   */
  for_each_cell(cb: (cell: Cell, state: number) => void, bounds ?: Bounds ) {

    if ( !bounds ){
      bounds = {
        horizontal_low: 0,
        horizontal_high: this.rows - 1,

        vertical_low : 0,
        vertical_high: this.columns - 1,
      }
    }

    for (let row = bounds.horizontal_low; row <= bounds.horizontal_high; row++) {
      for (let column = bounds.vertical_low; column <= bounds.vertical_high; column++) {
        cb([row, column], this.get_cell_state([row, column ]) as number);
      }
    }
  }

  /**
   * Process all cells in the universe and assigns the {@link Cell} PrimaryState returned by the callback;
   */
  process_ecosystem(cb: (cell: Cell, state: number) => boolean) {
    this.for_each_cell((cell, state) => {
      const is_alive = cb(cell, state);

      if (is_alive) {
        this.bless(cell);
      }
      if (!is_alive) {
        this.kill(cell);
      }
    });
  }
}
