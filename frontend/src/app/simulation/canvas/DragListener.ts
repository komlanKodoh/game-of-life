import Keyboard from './Keyboard';

interface DragEvent {
  x: number;
  y: number;

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

  modifiers = new Set<string>();

  is_dragging = false;

  callback_drag_start ?: ( e: MouseEvent ) => void
  callback_drag_end ?: ( e: MouseEvent) => void  

  constructor(
    private element: HTMLElement,
    private callback: (e: DragEvent) => void
  ) {
    this.init();
  }

  init() {
    this.element.addEventListener('mousedown', (e) => {
      this.is_dragging = true;

      this.previous_x = e.offsetX;
      this.previous_y = e.offsetY;

      this.drag_start_y = e.offsetY;
      this.drag_start_x = e.offsetX;

      this.modifiers = Keyboard.keys_pushed;

      this.callback_drag_start && this.callback_drag_start(e);
    });

    this.element.addEventListener('mousemove', (e) => {
      if (this.is_dragging === true) {

        this.callback({
          x: e.offsetX,
          y: e.offsetY,
          
          drag_star_x: this.drag_start_x,
          drag_star_y: this.drag_start_y,
          
          displacement_x: this.previous_x - e.offsetX,
          displacement_y: this.previous_y - e.offsetY,
          
          modifiers: this.modifiers
        });

        this.previous_x = e.offsetX;
        this.previous_y = e.offsetY;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (this.is_dragging === true) {
        this.previous_x = 0;
        this.previous_y = 0;
        this.is_dragging = false;
        this.modifiers = new Set();

        this.callback_drag_end && this.callback_drag_end(e);
      }
      
    });
  }

  onDragStart(callback: (e: MouseEvent) => void ){
    this.callback_drag_start = callback
    return this;
  }

  onDragEnd(callback: (e: MouseEvent) => void ){
    this.callback_drag_end = callback;
    return this;
  }
}
