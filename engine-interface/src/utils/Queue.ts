/**
 * Pipe data structure.
 * Follows a first in first out logic;
 */
export default class Queue<T> {
  private pipe: T[] = [];

  /**
   * Add an element at the end of the pipe;
   */
  add(item: T) {
    this.pipe.push(item);
  }

  /**
   * Adds an element to the head of the pipe.
   * The add element will be return on the next call to
   * next.
   */
  prepend(item: T) {
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
