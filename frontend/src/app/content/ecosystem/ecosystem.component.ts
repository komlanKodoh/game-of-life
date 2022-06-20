import {
  selectUser,
  selectUserToken,
  selectUserProfile,
} from './../../state/user/selectors';
import { AppState } from './../../state/index';
import { EcosystemRecord, Profile } from './../../state/user/reducer';
import { Ecosystem } from 'game-of-life-engine';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcosystemService } from 'src/app/account/ecosystem.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss'],
})
export class EcosystemComponent implements OnInit {
  name: string;
  isMine: boolean = false;
  ecosystemRecord?: EcosystemRecord;
  profile?: Profile;

  constructor(
    private route: ActivatedRoute,
    private ecosystem: EcosystemService,
    private store: Store<AppState>
  ) {
    this.name = this.route.snapshot.paramMap.get('name') as string;
    store.select(selectUserProfile).subscribe((profile) => {
      this.profile = profile as Profile;
      this.updateOwnership();
      if (this.ecosystemRecord) return;

      this.loadEcosystemRecord();
    });
  }

  loadEcosystemRecord() {
    this.ecosystem.getEcosystem(this.name).subscribe(({ data }) => {
      this.ecosystemRecord = data;
      this.updateOwnership();
    });
  }

  updateOwnership(){
    
    this.isMine =
        (this.profile && this.profile.id === this.ecosystemRecord?.owner_id) || false;
  }

  ngOnInit(): void {}
}
