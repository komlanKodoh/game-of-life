import { Bounds } from '../..';

export default class Scene {
  x = 0;
  y = 0;

  width: number = 0;
  height: number = 0;

  private scale_x = 1;
  private scale_y = 1;

  map_x(x: number) {
    return Math.floor((x - this.x) * this.scale_x);
  }

  map_y(y: number) {
    return Math.floor((y - this.y) * this.scale_y);
  }

  map_dimension(dimension: number) {
    return Math.floor(dimension * this.scale_x * 1000) / 1000;
  }

  private container_width = 0;
  private container_height = 0;
  fit(width: number, height: number) {
    this.scale_x = width / this.width;
    this.scale_y = height / this.height;

    this.container_width = width;
    this.container_height = height;
  }

  fit_width(width: number) {
    this.scale_x = width / this.width;
    this.scale_y = this.scale_x;

    this.container_width = width;
    this.container_height = this.scale_y * this.height;
  }

  fit_height(height: number) {
    this.scale_y = height / this.height;
    this.scale_x = this.scale_y;

    this.container_height = height;
    this.container_width = this.scale_x * this.container_width;
  }

  resize(width: number, height?: number) {
    if (height === undefined) {
      return this.setWidth(width);
    }

    this.width = width;
    this.height = height;

    this.fit(this.container_width, this.container_height);
  }

  private setWidth(width: number) {
    this.height = (this.height / this.width) * width;
    this.width = width;

    this.fit(this.container_width, this.container_height);
  }

  public center(x: number, y: number) {
    this.y = y - this.height / 2;
    this.x = x - this.width / 2;
  }

  isWithin(x: number, y: number) {
    return (
      this.y <= y &&
      y <= this.y + this.height &&
      this.x <= x &&
      x <= this.x + this.width
    );
  }

  getBounds(): Bounds {
    return {
      top: this.y,
      bottom: this.y + this.height,

      left: this.x,
      right: this.x + this.height,
    };
  }
}
