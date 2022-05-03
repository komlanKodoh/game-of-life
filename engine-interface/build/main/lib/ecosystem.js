"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const directive_1 = __importDefault(require("./Configuration/directive"));
const cell_1 = __importDefault(require("./cell"));
const game_of_life_1 = require("game-of-life");
const engine_bg_wasm_1 = require("game-of-life/engine_bg.wasm");
class Ecosystem {
    constructor(config) {
        this.parser = new directive_1.default.Parser();
        this.rows = config.rows;
        this.columns = config.columns;
        this.engine = game_of_life_1.Universe.new(config.rows, config.columns);
        this.state = new Uint8Array(engine_bg_wasm_1.memory.buffer, this.engine.get_cells(), this.rows * this.columns);
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
                let cell = cell_1.default.create(row, column);
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
exports.default = Ecosystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvc3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lY29zeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwRUFBa0Q7QUFDbEQsa0RBQTBCO0FBQzFCLCtDQUF3QztBQUN4QyxnRUFBcUQ7QUFJckQsTUFBcUIsU0FBUztJQVU1QixZQUFZLE1BQXdCO1FBRnBDLFdBQU0sR0FBRyxJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUU5QixJQUFJLENBQUMsTUFBTSxHQUFHLHVCQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQ3pCLHVCQUFNLENBQUMsTUFBTSxFQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDekIsQ0FBQztRQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFD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