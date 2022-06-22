import * as wasm from './engine_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
*/
export class AssociativeEcosystem {

    static __wrap(ptr) {
        const obj = Object.create(AssociativeEcosystem.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_associativeecosystem_free(ptr);
    }
    /**
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get_cell_state(row, column) {
        const ret = wasm.associativeecosystem_get_cell_state(this.ptr, row, column);
        return ret;
    }
    /**
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get_previous_cell_state(row, column) {
        const ret = wasm.associativeecosystem_get_previous_cell_state(this.ptr, row, column);
        return ret;
    }
    /**
    * @param {number} row
    * @param {number} column
    */
    kill(row, column) {
        wasm.associativeecosystem_kill(this.ptr, row, column);
    }
    /**
    * @param {number} row
    * @param {number} column
    */
    bless(row, column) {
        wasm.associativeecosystem_bless(this.ptr, row, column);
    }
    /**
    * @param {number} row
    * @param {number} column
    */
    toggle(row, column) {
        wasm.associativeecosystem_toggle(this.ptr, row, column);
    }
    /**
    */
    tick() {
        wasm.associativeecosystem_tick(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_relevant_cells() {
        const ret = wasm.associativeecosystem_get_relevant_cells(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get_relevant_cells_length() {
        const ret = wasm.associativeecosystem_get_relevant_cells_length(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {AssociativeEcosystem}
    */
    static new() {
        const ret = wasm.associativeecosystem_new();
        return AssociativeEcosystem.__wrap(ret);
    }
}
/**
*/
export class Ecosystem {

    static __wrap(ptr) {
        const obj = Object.create(Ecosystem.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ecosystem_free(ptr);
    }
    /**
    * Brings cells at given position back alive
    * @param {number} row
    * @param {number} column
    */
    bless(row, column) {
        wasm.ecosystem_bless(this.ptr, row, column);
    }
    /**
    * kills a living cell
    * @param {number} row
    * @param {number} column
    */
    kill(row, column) {
        wasm.ecosystem_kill(this.ptr, row, column);
    }
    /**
    * Toggle state of given cell position
    * @param {number} row
    * @param {number} column
    */
    toggle(row, column) {
        wasm.ecosystem_toggle(this.ptr, row, column);
    }
    /**
    * Returns the corresponding cell state when invoked with a given cell position
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get_cell_state(row, column) {
        const ret = wasm.ecosystem_get_cell_state(this.ptr, row, column);
        return ret;
    }
    /**
    * Returns the corresponding previous cell state when invoked with a given cell position for
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get_previous_cell_state(row, column) {
        const ret = wasm.ecosystem_get_previous_cell_state(this.ptr, row, column);
        return ret;
    }
    /**
    * Compute next state of game-of-life simulation
    */
    tick() {
        wasm.ecosystem_tick(this.ptr);
    }
    /**
    * @param {number} rows
    * @param {number} columns
    * @returns {Ecosystem}
    */
    static new(rows, columns) {
        const ret = wasm.ecosystem_new(rows, columns);
        return Ecosystem.__wrap(ret);
    }
}
/**
*/
export class Iterator {

    static __wrap(ptr) {
        const obj = Object.create(Iterator.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_iterator_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    is_empty() {
        const ret = wasm.iterator_is_empty(this.ptr);
        return ret !== 0;
    }
    /**
    */
    next() {
        wasm.iterator_next(this.ptr);
    }
    /**
    */
    reset() {
        wasm.iterator_reset(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_current_row() {
        const ret = wasm.iterator_get_current_row(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get_current_column() {
        const ret = wasm.iterator_get_current_column(this.ptr);
        return ret;
    }
    /**
    * @returns {Iterator}
    */
    static new() {
        const ret = wasm.iterator_new();
        return Iterator.__wrap(ret);
    }
}

export function __wbg_new_693216e109162396() {
    const ret = new Error();
    return addHeapObject(ret);
};

export function __wbg_stack_0ddaca5d1abfb52f(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_error_09919627ac0992f5(arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

