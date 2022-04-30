export default class Runner {
  isRunning: boolean = false;

  constructor(private action?: (...args: any) => void) {}

  setAction(action: (...args: any) => void) {
    this.action = action;
  }
  run() {
    if (!this.isRunning || !this.action) {
      return;
    }

    this.action();
    requestAnimationFrame(this.run.bind(this));
  }

  pause() {
    console.log('running');
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.run();
  }
}
