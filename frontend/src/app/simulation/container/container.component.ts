import { Component, OnInit } from '@angular/core';
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
} from '@angular/animations'
import Directive from 'game-of-life-engine/build/main/lib/Configuration/directive';

@Component({
  selector: 'app-container',
  animations: [

    trigger('isOpen_panel', [
      state('false', style({
        transform: "translateX(-100%)",
      })),
      transition('* <=> *', [
        animate('0.5s ease-in-out')
      ]),
    ]),

    trigger('isOpen_canvas', [
      state('true', style({
        transform: "scale(0.92)",
      })),
      transition('* <=> *', [
        animate('0.5s ease-in-out')
      ]),
    ]),

  ],
  
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})


export class ContainerComponent implements OnInit {
  panel!: PanelState;

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(select(selectPanelState))
      .subscribe((state) => (this.panel = state));
  }

  ngOnInit(): void {
    
  }

  toggle() {
    this.store.dispatch(toggle());
  }


}
