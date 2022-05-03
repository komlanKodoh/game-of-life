/**
 * Pipe data structure.
 * Follows a first in first out logic;
 */
export default class Pipeline<T> {
    private pipe;
    constructor();
    /**
     * Add an element at the end of the pipe;
     */
    add(item: T): void;
    /**
     * Adds an element to the head of the pipe.
     * The add element will be return on the next call to
     * next.
     */
    prepend(item: T): void;
    /**
     * Returns the next element available in the pipe,
     * Returns null if the pipe is empty
     */
    next(): T | null;
}
