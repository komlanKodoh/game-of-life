import { EcosystemRecord } from './../../state/user/reducer';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameOfLifeConfig, Ecosystem } from 'game-of-life-engine';
import { AppState } from 'src/app/state';
import { selectEcosystems } from 'src/app/state/simulation/ecosystems/selectors';
import { Profile } from 'src/app/state/user/reducer';
import { EcosystemDefinition } from '../../state/simulation/ecosystems/reducer';
import { togglePanel } from '../../state/simulation/panel/actions';
import { EcosystemService } from 'src/app/account/ecosystem.service';
import { UserService } from 'src/app/account/user.service';

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './configuration-panel.component.html',
  styleUrls: ['./configuration-panel.component.scss'],
})
export class ConfigurationPanelComponent implements OnInit {
  ecosystems!: EcosystemRecord[];
  marketplaceEcosystems!: EcosystemRecord[];

  userProfile!: Profile | undefined | null;

  @Output() DropEvent = new EventEmitter<GameOfLifeConfig>();

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private ecosystemService: EcosystemService,
  ) {
    this.store.pipe().subscribe((store) => {
      this.ecosystems = store.user?.ecosystems;
      this.userProfile = store.user?.profile;
    });
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.ecosystemService.getEcosystems().subscribe(({ data }) => {
      this.marketplaceEcosystems = data;
    });



  }
  toggle() {
    this.store.dispatch(togglePanel());
  }

  tabIdx: number = 0;
  handleTabChange( idx: number ){
    this.tabIdx = idx
  }

  logout(){
    this.userService.logout();
  }

  propagateDropEvent(ecosystem: GameOfLifeConfig) {
    this.DropEvent.emit(ecosystem);
  }
}
