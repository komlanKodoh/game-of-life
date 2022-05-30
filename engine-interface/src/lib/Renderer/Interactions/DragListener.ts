import Keyboard from './Keyboard';

interface DragEvent {
  x: number;
  y: number;

  e: MouseEvent;

  drag_star_y: number;
  drag_star_x: number;

  displacement_x: number;
  displacement_y: number;

  modifiers: Set<string>;
}

export default class DragListener {
  drag_start_x = 0;
  drag_start_y = 0;

  previous_x = 0;
  previous_y = 0;

  is_dragging = false;
  modifiers: Set<string> | null | undefined;

  callback_drag_start?: (e: DragEvent) => void;
  callback_drag_end?: (e: DragEvent) => void;

  constructor(
    private element: HTMLElement,
    private callback: (e: DragEvent) => void
  ) {
    this.init();
  }

  init() {
    this.element.addEventListener('mousedown', (e) => {
      this.modifiers = null;
      this.is_dragging = true;

      this.previous_x = e.offsetX;
      this.previous_y = e.offsetY;

      this.drag_start_y = e.offsetY;
      this.drag_start_x = e.offsetX;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.is_dragging) return;

      if (this.modifiers === null) {
        this.modifiers = new Set(Keyboard.keys_pushed);
        this.callback_drag_start &&
          this.callback_drag_start(this.new_drag_event(e));
      }

      this.callback(this.new_drag_event(e));

      this.previous_x = e.offsetX;
      this.previous_y = e.offsetY;
    });

    window.addEventListener('mouseup', (e) => {
      if (this.is_dragging === true) {
        this.previous_x = 0;
        this.previous_y = 0;
        this.is_dragging = false;

        // Modifiers are set to null at every mouse down. They are then set to a new value
        // when the mouse is dragged for the first time. If the mouse is removed and while the
        // modifiers are still null, we conclude that the mouse has not been dragged. Thus, there is
        // no need to fire a drag end event.
        if (this.modifiers === null) return false;

        this.callback_drag_end &&
          this.callback_drag_end(this.new_drag_event(e));
        this.modifiers = null;

        return false;
      }

      return true;
    });
  }

  new_drag_event(e: MouseEvent): DragEvent {
    if (!this.modifiers) throw new Error('new drag outside drag event context');

    return {
      e,

      x: e.offsetX,
      y: e.offsetY,

      drag_star_x: this.drag_start_x,
      drag_star_y: this.drag_start_y,

      displacement_x: this.previous_x - e.offsetX,
      displacement_y: this.previous_y - e.offsetY,

      modifiers: this.modifiers,
    };
  }

  onDragStart(callback: (e: DragEvent) => void) {
    this.callback_drag_start = callback;
    return this;
  }

  onDragEnd(callback: (e: DragEvent) => void) {
    this.callback_drag_end = callback;
    return this;
  }
}
