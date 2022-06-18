import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/account/user.service';
import {
  saveEcosystem,
  saveEcosystemFailure,
  saveEcosystemSuccess,
  setUserToken,
} from './actions';
import { EcosystemRecord } from './reducer';
import { EcosystemService } from 'src/app/account/ecosystem.service';

@Injectable()
export class EcosystemRecordEffects {

  saveEcosystemRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveEcosystem.type),
      mergeMap((action: Parameters<typeof saveEcosystem>[0]) =>
        this.ecosystemService.saveRecord(action.config, action.name).pipe(
          map((response) => saveEcosystemSuccess({ name: action.name })),
          catchError((e) => of(saveEcosystemFailure({ name: action.name })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ecosystemService: EcosystemService
  ) {}
}
