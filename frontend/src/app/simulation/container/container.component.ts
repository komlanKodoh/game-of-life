import { ClipboardData } from './../state/clipboard/reducer';
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
import { AreaSelectionEvent } from '../canvas/type';
import { write } from '../state/clipboard/actions';
import Mouse from 'src/utils/Mouse';
import { add } from '../state/ecosystems/actions';

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

  canvasPopupIsVisible = false;
  canvasPopupConfig = {
    left: 'transform: translate( -100% , 0px) ;',
    top: 'transform: translate( 0px, -100% ) ;',
  };
  canvasPopupStyle = 'transform: translate( 0px, 0px) ;';

  clipboard!: ClipboardData;

  @ViewChild('configPanel') configPanel!: ElementRef;
  @ViewChild('appCanvas') appCanvas!: ElementRef;

  constructor(private store: Store<AppState>) {
    window.addEventListener('click', () => {
      this.canvasPopupIsVisible = false;
    });

    this.store.pipe().subscribe((state) => {
      this.panel = state.panel;
      // @ts-ignore
      this.clipboard = state.clipboard;
    });
  }

  ngAfterViewInit(): void {
    this.updateScale();

    window.addEventListener('resize', () => {
      this.updateScale();
    });
  }

  toggle() {
    this.store.dispatch(toggle());
  }

  updateScale() {
    let panelWidth =
    this.configPanel.nativeElement.getBoundingClientRect().width;
    let canvasWidth = window.innerWidth  ;

    this.scale = (canvasWidth - panelWidth) / canvasWidth;

    this.appCanvas.nativeElement.style.setProperty('--scale', this.scale);
  }

  showCanvasPopup(event: AreaSelectionEvent) {
    this.canvasPopupStyle = `transform : translate(${Mouse.x}px, ${Mouse.y}px);`;

    this.canvasPopupIsVisible = true;
    this.store.dispatch(
      write({ contentType: 'directive', content: event.directive })
    );
  }

  saveComponent() {
    this.store.dispatch(
      add({
        rows: 5,
        columns: 10,
        name: 'dummy',
        directive_composition: this.clipboard.content,
      })
    );
  }
}
