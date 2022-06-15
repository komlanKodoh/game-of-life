import { createAction, props } from '@ngrx/store';
import { GameOfLifeConfig } from 'game-of-life-engine';
import { Profile, Token, User } from './reducer';

export const setUserProfile = createAction(
  '[USER] Set current user',
  props<Profile>()
);

export const setUserToken = createAction(
  '[USER] Set user Auth token',
  props<Token>()
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


// "@angular/common": "~13.3.0",
// "@angular/compiler": "~13.3.0",
// "@angular/core": "~13.3.0",
// "@angular/forms": "~13.3.0",
// "@angular/platform-browser": "~13.3.0",
// "@angular/platform-browser-dynamic": "~13.3.0",
// "@angular/platform-server": "^12",
// "@angular/router": "~13.3.0",
// "@ngrx/effects": "^13.2.0",
// "@ngrx/store": "^13.1.0",
// "@ngrx/store-devtools": "^13.1.0",
// "@scullyio/init": "^2.1.32",
// "@scullyio/ng-lib": "^2.1.0",
// "@scullyio/platform-server": "^2.1.0",
// "@scullyio/scully": "^2.1.0",
// "@scullyio/scully-plugin-puppeteer": "^2.1.32",
// "@tailwindcss/forms": "^0.5.2",
// "game-of-life-engine": "file:../engine-interface",
// "rxjs": "~7.5.0",
// "tslib": "^2.3.0",
// "zone.js": "~0.11.4"