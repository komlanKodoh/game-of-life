type PushedEvent = KeyboardEvent & { isPushed: boolean };

export default class PushedListener {
  is_pushed: boolean = false;


  constructor(
    private relevant_key: string,
    private callback?: (e: PushedEvent) => void,
    private element?: Window & typeof globalThis
  ) {
    this.init();
  }

  init() {
    if (!this.element) {
      window.addEventListener('keydown', (e) => {
        if (this.relevant_key !== e.key) return;

        this.is_pushed = true;
        this.emit(e);
      });

      window.addEventListener('keyup', (e) => {
          console.log ( "key up ", e.key )
        if (this.relevant_key !== e.key) return;

        this.is_pushed = false;
        this.emit(e);
      });

      return;
    }

    this.element.addEventListener('keydown', (e) => {
      if (this.relevant_key !== e.key) return;

      this.is_pushed = true;
      this.emit(e);
    });

    this.element.addEventListener('keyup', (e) => {
      if (this.relevant_key !== e.key) return;

      this.is_pushed === false;
      this.emit(e);
    });
  }

  emit(event: KeyboardEvent) {
    if ( !this.callback) return;
    this.callback(Object.assign(event, { isPushed: this.is_pushed }));
  }
  
}
