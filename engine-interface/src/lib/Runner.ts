export default class Runner {
  /**
   * Wether or not the runner is in a running state;
   */
  isRunning: boolean = false;

  constructor(
    /**
     * Action that must be executed at every iteration of the runner
     */
    private action?: (...args: any) => void
  ) {}

  /**
   * Set the action that the runner should perform on every iteration
   * @param action Action that must be executed at every iteration of the runner
   */
  setAction(action: (...args: any) => void) {
    this.action = action;
  }

  /**
   * Continuously runs the action if the runner action if the runner is
   * in a running state;
   */
  private run() {
    if (!this.isRunning || !this.action) {
      return;
    }

    this.action();
    requestAnimationFrame(this.run.bind(this));
  }

  /**
   * Execute the runners action ( forward ) a single time;
   */

  moveForward() {
    if (!this.action) return;

    this.pause();
    this.action();
  }

  /**
   * Put the runner in a non-running state;
   */
  pause() {
    this.isRunning = false;
  }

  /**
   * Puts the runner in a running state;
   */
  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.run();
  }

  /**
   * Toggler runner state between running and not running;
   */
  toggle() {
    this.isRunning ? this.pause() : this.start();
  }
}
