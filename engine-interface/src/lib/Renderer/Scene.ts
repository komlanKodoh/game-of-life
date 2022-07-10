import { Bounds } from '../..';

/**
 * A camera that gives a specific view of the universe. The scene is used as a utility
 * to map between in universe measurement, and canvas size painting
 */
export default class Scene {
  x = 0;
  y = 0;

  width: number = 0;
  height: number = 0;

  /**scale between scene values and canvas values, used for value mapping between universe and canvas */
  private scale_x = 1;

  /**scale between scene values and canvas values, used for value mapping between universe and canvas */
  private scale_y = 1;

  /** Transform a x position from the universe to the corresponding canvas coordinate
   *
   * @note It is assume that the scene is rendered in the entirety of the canvas
   */
  map_x(x: number) {
    return Math.floor((x - this.x) * this.scale_x);
  }

  /** Transform a x position from the universe to the corresponding canvas coordinate
   *
   * @note It is assume that the scene is rendered in the entirety of the canvas
   */
  map_y(y: number) {
    return Math.floor((y - this.y) * this.scale_y);
  }

  /**
   * Transform a dimension position from the universe to the corresponding canvas coordinate
   *
   * @note It is assume that the scene is rendered in the entirety of the canvas
   */
  map_dimension(dimension: number) {
    return Math.floor(dimension * this.scale_x * 1000) / 1000;
  }

  private container_width = 0;
  private container_height = 0;

  /**
   * Updates scene mapping configurations, to render match canvas width and canvas height;
   * Note that this method does not guarantee a preserved aspect ratio.
   *
   * @param width with of the destination canvas
   * @param height height of the destination canvas
   */
  fit(width: number, height: number) {
    this.scale_x = width / this.width;
    this.scale_y = height / this.height;

    this.container_width = width;
    this.container_height = height;
  }

  /**
   * Updates scene mapping configurations, to render match canvas width and canvas height;
   *
   * @param width with of the destination canvas
   */
  fit_width(width: number) {
    this.scale_x = width / this.width;
    this.scale_y = this.scale_x;

    this.container_width = width;
    this.container_height = this.scale_y * this.height;
  }

  /**
   * Updates scene mapping configurations, to render match canvas width and canvas height;
   * @param height height of the destination canvas
   */
  fit_height(height: number) {
    this.scale_y = height / this.height;
    this.scale_x = this.scale_y;

    this.container_height = height;
    this.container_width = this.scale_x * this.container_width;
  }

  /**
   * Resize scene to given dimension. when omitted, height is computed,
   * in order to maintain the current aspect ratio.
   * 
   * @note When passed, height could modify the current scene aspect ratio. This would
   * result in a skewed rendering on the current canvas. To mitigate this issue, make sure to
   * call fit with a with and height whose aspect ratio match the new scene aspect ratio. 
   * 
   * @param width new scene width
   * @param height new scene height
   */
  resize(width: number, height?: number) {
    if (height === undefined) {
      height = (this.height / this.width) * width;
    }

    this.width = width;
    this.height = height;

    this.fit(this.container_width, this.container_height);
  }


  /**
   * Centers the scene around a point with coordinates x and y
   */
  public center(x: number, y: number) {
    this.y = y - this.height / 2;
    this.x = x - this.width / 2;
  }

  /**
   * Returns true if points with given coordinates belongs to the scene
   */
  isWithin(x: number, y: number) {
    return (
      this.y <= y &&
      y <= this.y + this.height &&
      this.x <= x &&
      x <= this.x + this.width
    );
  }

  /**
   * Returns sene bounds
   */
  getBounds(): Bounds {
    return {
      top: this.y,
      bottom: this.y + this.height,

      left: this.x,
      right: this.x + this.height,
    };
  }
}
