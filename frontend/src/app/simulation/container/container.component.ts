import { Component, ViewChild, ElementRef, Sanitizer } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toggle } from '../state/panel/actions';
import { AppState, PanelState } from '../state/panel/reducer';
import { selectPanelState } from '../state/panel/selectors';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import Directive from 'game-of-life-engine/build/main/lib/Configuration/directive';

@Component({
  selector: 'app-container',
  animations: [
    trigger('isOpen_panel', [
      state(
        'false',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('* <=> *', [animate('0.5s ease-in-out')]),
    ]),

    trigger('isOpen_canvas', [
      state(
        'true',
        style({
          transform: 'translateX(18em) scale(var(--scale))',
        })
      ),
      transition('* <=> *', [animate('0.5s ease-in-out')]),
    ]),
  ],

  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  panel!: PanelState;
  scale!: number;

  @ViewChild('configPanel') configPanel!: ElementRef;
  @ViewChild('appCanvas') appCanvas!: ElementRef;

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(select(selectPanelState))
      .subscribe((state) => (this.panel = state));
  }

  ngAfterViewInit(): void {
    this.updateScale();

    window.addEventListener('resize', () => this.updateScale());
  }

  toggle() {
    this.store.dispatch(toggle());
  }

  updateScale() {
    let canvasWidth = this.appCanvas.nativeElement.getBoundingClientRect().width;
    let panelWidth =
      this.configPanel.nativeElement.getBoundingClientRect().width;

    this.scale = (canvasWidth - panelWidth) / canvasWidth;

    this.appCanvas.nativeElement.style.setProperty('--scale', this.scale );
  }
}
