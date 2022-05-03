"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Pipe data structure.
 * Follows a first in first out logic;
 */
class Pipeline {
    constructor() {
        this.pipe = [];
    }
    /**
     * Add an element at the end of the pipe;
     */
    add(item) {
        this.pipe.push(item);
    }
    /**
     * Adds an element to the head of the pipe.
     * The add element will be return on the next call to
     * next.
     */
    prepend(item) {
        this.pipe.unshift(item);
    }
    /**
     * Returns the next element available in the pipe,
     * Returns null if the pipe is empty
     */
    next() {
        return this.pipe.shift() || null;
    }
}
exports.default = Pipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlwZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvUGlwZWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7O0dBR0c7QUFDSCxNQUFxQixRQUFRO0lBRzNCO1FBRlEsU0FBSSxHQUFRLEVBQUUsQ0FBQztJQUVSLENBQUM7SUFFaEI7O09BRUc7SUFDSCxHQUFHLENBQUMsSUFBTztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFFLElBQVE7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUUsQ0FBQTtJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUM7SUFDbkMsQ0FBQztDQUVGO0FBN0JELDJCQTZCQyJ9