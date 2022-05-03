/**
 * Pipe data structure.
 * Follows a first in first out logic;
 */
export default class Pipeline {
    pipe = [];
    constructor() { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlwZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvUGlwZWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFRO0lBQ25CLElBQUksR0FBUSxFQUFFLENBQUM7SUFFdkIsZ0JBQWUsQ0FBQztJQUVoQjs7T0FFRztJQUNILEdBQUcsQ0FBQyxJQUFPO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxPQUFPLENBQUUsSUFBUTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFBO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0NBRUYifQ==