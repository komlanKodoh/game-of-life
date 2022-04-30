import DragListener from './DragListener';

export default class Scene {
  x: number = 60;
  y: number = 60;

  width: number = 15 * 60;
  height: number = 15 * 100;

  scale_x : number = 1;
  scale_y : number = 1;

  map_x(x: number) {
    return (x - this.x) * this.scale_x ;
  }

  map_y(y: number) {
    return (y - this.y) * this.scale_y;
  }

  map_dimension(dimension: number) {
    return dimension * this.scale_x;
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

  resize(width: number, height?: number ){
   
    if ( height  === undefined){
      return this.setWidth(width)
    }

    this.width = width;
    this.height = height;
  }

  private setWidth(width: number ){
    this.height = (this.height / this.width) * width ;
    this.width = width
  }

}
