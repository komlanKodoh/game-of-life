import Scene from '../Scene';

export default class Mouse {
  x = 0;
  y = 0;

  constructor(private scene: Scene, private canvas: HTMLCanvasElement) {
    window.addEventListener('mousemove', (e) => {
      const boundingRect = canvas.getBoundingClientRect();

      this.x = this.get_x(e.clientX - boundingRect.x);
      this.y = this.get_y(e.clientY - boundingRect.y);
    });
  }

  private get_x(real_x: number) {
    return (
      (real_x * this.scene.width) / this.canvas.getBoundingClientRect().width +
      this.scene.x
    );
  }

  private get_y(real_y: number) {
    return (
      (real_y * this.scene.height) /
        this.canvas.getBoundingClientRect().height +
      this.scene.y
    );
  }
}
