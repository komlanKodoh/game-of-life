interface DragEvent {
  x: number;
  y: number;

  drag_star_y: number;
  drag_star_x: number;

  displacement_x: number;
  displacement_y: number;
}

export default class DragListener {
  drag_start_x = 0;
  drag_start_y = 0;

  previous_x = 0;
  previous_y = 0;

  is_dragging = false;

  constructor(
    private element: HTMLElement,
    private callback: (e: DragEvent) => void
  ) {
      this.init();
  }

  init() {
    this.element.addEventListener('mousedown', (e) => {
      this.previous_x = e.offsetX;
      this.previous_y = e.offsetY;

      this.drag_start_y = e.offsetY;
      this.drag_start_x = e.offsetX;

      this.is_dragging = true;
    });

    this.element.addEventListener('mousemove', (e) => {
      if (this.is_dragging === true) {
        this.callback({
          x: e.offsetX,
          y: e.offsetY,

          displacement_x : this.previous_x - e.offsetX,
          displacement_y: this.previous_y - e.offsetY,

          drag_star_x: this.drag_start_x,
          drag_star_y: this.drag_start_y,
        });
        this.previous_x = e.offsetX;
        this.previous_y = e.offsetY;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (this.is_dragging  === true) {
        this.previous_x = 0;
        this.previous_y = 0;
        this.is_dragging = false;
      }
    });
  }
}
