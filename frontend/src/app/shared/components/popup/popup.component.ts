import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input('visible') isVisible = false;
  @Input() configuration: Bounds = {};
  @ViewChild('wrapper') wrapper!: ElementRef;

  @Input() position: string = '';
  controlledStyle = 'opacity: 0;  pointer-events: none; height: 0;';

  ngOnInit(): void {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] || changes['position']) {
      this.updatePopupPosition();
    }
  }

  updatePopupPosition() {
    if ( ! this.wrapper ) return;

    let modifications: (keyof Bounds)[] = [];

    let boundingRect = this.wrapper.nativeElement.getBoundingClientRect();

    if (boundingRect.x + boundingRect.width> window.innerWidth) {
      modifications.push('left');
    }

    if (boundingRect.y + boundingRect.height > window.innerHeight) {
      modifications.push('top');
    }

    this.controlledStyle = this.getStyle(modifications);

    if ( this.isVisible ) this.controlledStyle += "opacity : 1 ; "
    else this.controlledStyle += " opacity: 0; pointer-events: none;  height: 0;"
  }

  getStyle(modifications: (keyof Bounds)[]) {
    let style = '';

    modifications.forEach((modification) => {
      style += this.configuration[modification];
    });

    return style;
  }
}

type Bounds = {
  top?: string;
  bottom?: string;

  left?: string;
  right?: string;
};
