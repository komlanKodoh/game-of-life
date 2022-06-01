import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameOfLifeConfig } from 'game-of-life-engine';
import { AppState, EcosystemDefinition } from '../state/ecosystems/reducer';
import { toggle } from '../state/panel/actions';

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './configuration-panel.component.html',
  styleUrls: ['./configuration-panel.component.scss'],
})
export class ConfigurationPanelComponent implements OnInit {
  ecosystems!: EcosystemDefinition[];

  @Output() DropEvent = new EventEmitter<GameOfLifeConfig>(); 


  constructor(private store: Store<AppState>) {
    this.store.pipe().subscribe((state) => {
      this.ecosystems = state.ecosystems;
    });
  }

  ngOnInit(): void {}

  toggle(){
    this.store.dispatch(toggle())
  };

  propagateDropEvent(ecosystem: GameOfLifeConfig){
    this.DropEvent.emit(ecosystem);
  }
}
