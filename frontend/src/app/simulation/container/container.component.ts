import { saveEcosystem } from './../../state/user/actions';
import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';
import { ClipboardData } from '../../state/simulation/clipboard/reducer';
import {
  Component,
  ViewChild,
  ElementRef,
  Sanitizer,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { togglePanel } from '../../state/simulation/panel/actions';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import Directive from 'game-of-life-engine/build/main/lib/Configuration/directive';
import { AreaSelectionEvent } from '../canvas/type';
import { write } from '../../state/simulation/clipboard/actions';
import Mouse from 'src/utils/Mouse';
import Channel from '../canvas/Channel';
import { PanelState } from '../../state/simulation/panel/reducer';
import { AppState } from 'src/app/state';
import { UserService } from 'src/app/account/user.service';
import { Meta, Title } from '@angular/platform-browser';

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
          transform: 'translateX(24rem) scale(var(--scale))',
        })
      ),
    ]),
  ],

  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  panel!: PanelState;
  scale!: number;
  canvasChannel!: Channel;

  canvasPopupIsVisible = false;

  clipboard!: ClipboardData;

  @ViewChild('configPanel') configPanel!: ElementRef;
  @ViewChild('appCanvas') appCanvas!: ElementRef;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private meta: Meta,
    private title: Title,
  ) {
    this.store.pipe().subscribe((state) => {
      this.panel = state.simulation.panel;
      this.clipboard = state.simulation.clipboard;
    });
  }

  ngOnInit() {
    this.userService.refreshToken();
    this.title.setTitle("Conway's Game of Life");
    this.meta.addTags([
      {name: "description", description: "A implementation of Conway's game of life simulation running in the your browser using wasm." }
    ])
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
    this.store.dispatch(togglePanel());
  }

  updateScale() {
    let panelWidth =
      this.configPanel.nativeElement.getBoundingClientRect().width;
    let canvasWidth = window.innerWidth;

    this.scale = (canvasWidth - panelWidth) / canvasWidth;

    this.appCanvas.nativeElement.style.setProperty('--scale', this.scale);
  }

  showCanvasPopup(event: AreaSelectionEvent) {
    this.canvasPopupIsVisible = true;
    this.store.dispatch(write({ contentType: 'directive', content: event }));
  }

  handleCanvasInitialization({ channel }: { channel: Channel }) {
    this.canvasChannel = channel;

    this.canvasChannel.registerListener(
      ['save-as-component'],
      ({ component }) => {
        this.store.dispatch(
          saveEcosystem({ config: component, name: new Date().toString() })
        );
      }
    );
  }

  dropInCanvas(ecosystem: GameOfLifeConfig) {
    this.canvasChannel.diffuse({
      name: 'paste-component',
      component: ecosystem,
      position: 'mouse',
    });
  }
}
