export default class Scene {
  x = 60;
  y = 60;

  width: number = 15 * 60;
  height: number = 15 * 100;

  scale_x = 1;
  scale_y = 1;

  map_x(x: number) {
    return Math.floor((x - this.x) * this.scale_x);
  }

  map_y(y: number) {
    return Math.floor((y - this.y) * this.scale_y);
  }

  map_dimension(dimension: number) {
    return Math.floor(dimension * this.scale_x);
  }

  fit(width: number, height: number) {
    this.scale_x = width / this.width;
    this.scale_y = height / this.height;
  }

  fit_width(width: number) {
    this.scale_x = width / this.width;
    this.scale_y = this.scale_x;
  }

  fit_height(height: number) {
    this.scale_y = height / this.height;
    this.scale_x = this.scale_y;
  }

  resize(width: number, height?: number) {
    if (height === undefined) {
      return this.setWidth(width);
    }

    this.width = width;
    this.height = height;
  }

  private setWidth(width: number) {
    this.height = (this.height / this.width) * width;
    this.width = width;
  }

  isWithin(x: number, y: number) {
    return (
      this.y <= y &&
      y <= this.y + this.height &&
      this.x <= x &&
      x <= this.x + this.width
    );
  }
}
