import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, EcosystemDefinition } from '../state/ecosystems/reducer';

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './configuration-panel.component.html',
  styleUrls: ['./configuration-panel.component.scss'],
})
export class ConfigurationPanelComponent implements OnInit {
  ecosystems!: EcosystemDefinition[];

  constructor(private store: Store<AppState>) {
    this.store.pipe().subscribe((state) => {
      this.ecosystems = state.ecosystems;
    });
  }

  ngOnInit(): void {}
}
