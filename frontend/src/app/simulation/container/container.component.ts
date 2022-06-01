import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';
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
import Channel from '../canvas/Channel';

@Component({
  selector: 'app-container',
  animations: [
    trigger('isOpen_panel', [
      transition('* <=> *', [animate('0.5s ease-in-out')]),
      state(
        'false',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      state(
        'true',
        style({
          opacity: 1,
        })
      ),
    ]),

    trigger('isOpen_canvas', [
      transition('* <=> *', [animate('0.5s ease-in-out')]),
      state(
        'true',
        style({
          transform: 'translateX(18em) scale(var(--scale))',
        })
      ),
    ]),
  ],

  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  panel!: PanelState;
  scale!: number;
  canvasChannel!: Channel;

  canvasPopupIsVisible = false;
  canvasPopupConfig = {
    left: 'transform: translate( -100% , 0px) ;',
    top: 'transform: translate( 0px, -100% ) ;',
  };
  canvasPopupStyle = 'transform: translate( 0px, 0px) ; opacity: 0; ';

  clipboard!: ClipboardData;

  @ViewChild('configPanel') configPanel!: ElementRef;
  @ViewChild('appCanvas') appCanvas!: ElementRef;

  constructor(private store: Store<AppState>) {
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

  close(): void {
    this.canvasPopupIsVisible = false;
  }

  toggle() {
    this.store.dispatch(toggle());
  }

  updateScale() {
    let panelWidth =
      this.configPanel.nativeElement.getBoundingClientRect().width;
    let canvasWidth = window.innerWidth;

    this.scale = (canvasWidth - panelWidth) / canvasWidth;

    this.appCanvas.nativeElement.style.setProperty('--scale', this.scale);
  }

  showCanvasPopup(event: AreaSelectionEvent) {
    this.canvasPopupStyle = `transform : translate(${Mouse.x}px, ${Mouse.y}px); opacity: 1;`;

    this.canvasPopupIsVisible = true;
    this.store.dispatch(write({ contentType: 'directive', content: event }));
  }

  saveComponent() {
    if (!this.clipboard.content) return;

    this.store.dispatch(add({ ...this.clipboard.content, name: 'dummy' }));
  }

  handleCanvasInitialization({ channel }: { channel: Channel }) {
    this.canvasChannel = channel;
  }

  dropInCanvas(ecosystem: GameOfLifeConfig) {
    this.canvasChannel.diffuse({
      name: 'paste-component',
      component: ecosystem,
      position: 'mouse'
    });
  };


}
