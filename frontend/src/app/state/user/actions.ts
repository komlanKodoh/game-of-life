import { createAction, props } from '@ngrx/store';
import { GameOfLifeConfig } from 'game-of-life-engine';
import { EcosystemRecord, Profile, Token, User } from './reducer';

export const setUserProfile = createAction(
  '[USER] Set current user',
  props<Profile>()
);

export const setUserToken = createAction(
  '[USER] Set user Auth token',
  props<Token>()
);

export const logUserOut = createAction(
  '[User] Log user out and empty profile'
);


export const loadEcosystems = createAction(
  '[ECOSYSTEM] set world ecosystems',
  props<{ payload: EcosystemRecord[] }>()
);


export const saveEcosystem = createAction(
  '[USER] Add ecosystem to user account',
  props<{ config: GameOfLifeConfig; name: string }>()
);

export const saveEcosystemSuccess = createAction(
  '[USER] Add ecosystem to user account has succeeded',
  props<{ name: string }>()
);

export const saveEcosystemFailure = createAction(
  '[USER] Add ecosystem to user account has failed',
  props<{ name: string }>()
);
