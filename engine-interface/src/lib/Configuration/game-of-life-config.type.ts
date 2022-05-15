import { ObjectMap } from '../../utils/index.generic';
import Cell from '../Cell';

import Directive from './directive';

/**
 * Config Object used to initialize a GameOfLifeSimulation simulation.
 */
export type GameOfLifeConfig = {
  /**
   * Number of rows present in the game of life simulation
   */
  readonly rows: number;

  /**
   * Number of columns present in the game of life simulation
   */
  readonly columns: number;

  /**
   * Function that determines if any given cell is a live.
   *
   * This function will be called to evaluate every single in
   * the simulation during the world's initialization. The given
   * cell is alive if the functions returns true, else it is dead
   */

  readonly is_alive?: (cell: Cell) => boolean;

  /**
   * A dictionary {@link Directive}. The required default Directive is
   * used as the first directive to initialize the simulation;
   */
  readonly directives?: ObjectMap<string, Directive>;

  /**
   * Interpolates directives given in {@link GameOfLifeConfig.directives},
   * and returns a new directive.
   * @see {@link DirectiveComposition}
   */
  readonly directive_composition?: DirectiveComposition;
};

/**
 * A DirectiveComposition is a glorified {@link Directive};
 * What makes it different is that it allows to compose different
 * directives.
 *
 * ### Directive injection
 *
 * Directive injection is allowed by the use of the -|{declared_directive}.{offset}.
 *
 * #### Example:
 *
 * Assuming that the *square* directive has been declared as one of the directives;
 * we can write:
 *
 * ```ts
 * let directive_composition = `
 * 1,2,6
 * 6, -|squared.5
 * ->3 5,9, 6
 * `.trim()
 * ```
 *
 * The parser interpolates the squared directive and applies a row offset of 5.
 * Because the directive is interpolated we must explicitly tell the parser which line to return to.
 */
export type DirectiveComposition = string;
