import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EcosystemService } from 'src/app/account/ecosystem.service';
import { AppState } from 'src/app/state';
import { EcosystemRecord } from 'src/app/state/user/reducer';
import { selectUserProfile } from 'src/app/state/user/selectors';

@Component({
  selector: 'app-ecosystem-edit',
  templateUrl: './ecosystem-edit.component.html',
  styleUrls: ['./ecosystem-edit.component.scss'],
})
export class EcosystemEditComponent implements OnInit {
  name: string;
  ecosystemRecord?: EcosystemRecord;
  ecosystemRecordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ecosystem: EcosystemService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.name = this.route.snapshot.paramMap.get('name') as string;

    this.ecosystemRecordForm = this.formBuilder.group({
      name: '',
      description: '',
      public: false,
    });

    store.select(selectUserProfile).subscribe((_) => {
      if (this.ecosystemRecord) return;

      this.loadEcosystemRecord();
    });
  }

  loadEcosystemRecord() {
    this.ecosystem.getEcosystem(this.name).subscribe(({ data }) => {
      this.ecosystemRecord = data;

      this.ecosystemRecordForm = this.formBuilder.group({
        description: data.description || "",
        public: data.public,
        name: data.name
      });
      
    });
  }

  ngOnInit(): void {}

  save() {
    if (!this.ecosystemRecord) return;

    const formValue = this.ecosystemRecordForm.value as {
      description: string;
      public: boolean;
    };

    Object.assign(this.ecosystemRecord, formValue);

    this.ecosystem.updateEcosystem(this.ecosystemRecord).subscribe();
  }
}
