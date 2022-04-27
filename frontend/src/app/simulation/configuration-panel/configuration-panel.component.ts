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

  constructor() {}

  ngOnInit(): void {}

}
