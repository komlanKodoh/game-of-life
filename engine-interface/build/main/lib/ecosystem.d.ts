import Directive from './Configuration/directive';
import Cell from './cell';
import { Universe } from 'game-of-life';
import { GameOfLifeConfig } from './game-of-life-config.type';
import { ObjectMap } from '../utils/index.generic';
export default class Ecosystem {
    /**
     * A list of all state live/death present in the current ecosystem;
     */
    rows: number;
    columns: number;
    engine: Universe;
    state: Uint8Array;
    parser: Directive.Parser;
    constructor(config: GameOfLifeConfig);
    set_rows(rows: number): void;
    set_columns(columns: number): void;
    register_directives(directives: ObjectMap<string, Directive>): void;
    /**
     * Loads a {@link Directive} into the ecosystem
     */
    integrate_directive(directive: Directive): void;
    /**
     * Returns a cell index in the linear world;
     */
    private get_cell_index;
    /**
     * Brings a cell back to live
     */
    bless(cell: Cell): void;
    /**
     * Kills a living cell
     */
    kill(cell: Cell): void;
    /**
     * Advance the simulation of one frame;
     */
    next(): void;
    /**
     * Returns the state of any given cell;
     */
    get_cell_state(cell: Cell): number | undefined;
    for_each_cell(cb: (cell: Cell, state: number) => void): void;
    process_ecosystem(cb: (cell: Cell, state: number) => boolean): void;
}
