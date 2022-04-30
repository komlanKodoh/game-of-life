import DragListener from './DragListener';

export default class Camera {
  x: number = 60;
  y: number = 60;

  width: number = 15 * 60;
  height: number = 15 * 100;

  private scale: number = 1;

  map_x(x: number) {
    return this.apply_scale(x - this.x);
  }

  map_y(y: number) {
    return this.apply_scale(y - this.y);
  }

  apply_scale(value: number) {
    return value * this.scale;
  }

  fit(width: number, height: number){
    this.scale = this.width / width;
  }
}
