import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';
import { createReducer, createSelector, on } from '@ngrx/store';
import * as userActions from './actions';

export type Profile = {
  id: string;
  username: string;
};

export type Token = {
  expires: number;
  value: string;
};

export type EcosystemRecord = GameOfLifeConfig & {
  name: string;
  status: 'saving-success' | 'saving-failure' | 'saving';
};

export type User = {
  profile?: Profile | null;
  token?: Token | null;
  ecosystems: EcosystemRecord[];
};

export const initialState: User = {
  profile: null,
  token: null,
  ecosystems: [],
};

export const userReducer = createReducer(
  initialState as User,

  on(userActions.setUserProfile, (state, payload) => {
    return { ...state, profile: payload };
  }),

  on(userActions.setUserToken, (state, payload) => {
    return { ...state, token: payload };
  }),

  on(userActions.saveEcosystem, (state, { config, name }) => {
    console.log ( config )
    const record: EcosystemRecord = {
      name,
      ...config,
      status: 'saving'
    };

    return { ...state, ecosystems: [...state.ecosystems, record] };
  })
);
