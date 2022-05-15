import { Directive } from 'game-of-life-engine/build/main/lib/Configuration/directive';
import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';
import { selectPanelState } from './../state/panel/selectors';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toggle } from '../state/panel/actions';
import { AppState, PanelState } from '../state/panel/reducer';

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './configuration-panel.component.html',
  styleUrls: ['./configuration-panel.component.scss'],
})
export class ConfigurationPanelComponent implements OnInit {
  sample: GameOfLifeConfig = {
    rows: 20,
    columns: 20,
    directives: {
      ship: `
      2,
      3,
      1,2,3,
      `.trim(),
      ships: `
            2,
            1,
            1,2,3
      `.trim(),
    },
    directive_composition: `
    ->5, -|ship.0,
    ->8, -|ships.2,
    `.trim(),
  };
  constructor() {}

  ngOnInit(): void {}
}
