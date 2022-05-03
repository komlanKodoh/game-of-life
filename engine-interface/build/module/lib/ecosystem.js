import Directive from './Configuration/directive';
import Cell from './cell';
import { Universe } from 'game-of-life';
import { memory } from 'game-of-life/engine_bg.wasm';
export default class Ecosystem {
    /**
     * A list of all state live/death present in the current ecosystem;
     */
    rows;
    columns;
    engine;
    state;
    parser = new Directive.Parser();
    constructor(config) {
        this.rows = config.rows;
        this.columns = config.columns;
        this.engine = Universe.new(config.rows, config.columns);
        this.state = new Uint8Array(memory.buffer, this.engine.get_cells(), this.rows * this.columns);
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
    set_rows(rows) {
        this.rows = rows;
    }
    set_columns(columns) {
        this.columns = columns;
    }
    register_directives(directives) {
        Object.keys(directives).forEach((directive_name) => {
            this.parser.register_directive(directive_name, directives[directive_name]);
        });
    }
    /**
     * Loads a {@link Directive} into the ecosystem
     */
    integrate_directive(directive) {
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
     * Returns a cell index in the linear world;
     */
    get_cell_index([_row, _column]) {
        let row = _row % this.rows;
        let column = _column % this.columns;
        return row * this.columns + column;
    }
    /**
     * Brings a cell back to live
     */
    bless(cell) {
        let idx = this.get_cell_index(cell);
        this.state.set([255], idx);
    }
    /**
     * Kills a living cell
     */
    kill(cell) {
        let idx = this.get_cell_index(cell);
        this.state.set([254], idx);
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
    get_cell_state(cell) {
        return this.state[this.get_cell_index(cell)];
    }
    for_each_cell(cb) {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                let cell = Cell.create(row, column);
                cb(cell, this.get_cell_state(cell));
            }
        }
    }
    process_ecosystem(cb) {
        this.for_each_cell((cell, state) => {
            let is_alive = cb(cell, state);
            if (is_alive) {
                this.bless(cell);
            }
            if (!is_alive) {
                this.kill(cell);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvc3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lY29zeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBUztJQUM1Qjs7T0FFRztJQUNILElBQUksQ0FBUztJQUNiLE9BQU8sQ0FBUztJQUNoQixNQUFNLENBQVc7SUFDakIsS0FBSyxDQUFhO0lBQ2xCLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVoQyxZQUFZLE1BQXdCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQ3pCLE1BQU0sQ0FBQyxNQUFNLEVBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUN6QixDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELG1CQUFtQixDQUFDLFVBQXdDO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FDNUIsY0FBYyxFQUNkLFVBQVUsQ0FBQyxjQUFjLENBQVcsQ0FDckMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLENBQUMsU0FBb0I7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUIsU0FBUztZQUNQLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFckMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNO2FBQ1A7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ssY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBTztRQUMxQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMzQixJQUFJLE1BQU0sR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVwQyxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBVTtRQUNkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsSUFBVTtRQUNiLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsSUFBVTtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBdUM7UUFDbkQsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDeEMsS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3BELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUVwQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFXLENBQUMsQ0FBQzthQUMvQztTQUNGO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQTBDO1FBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDakMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUvQixJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YifQ==