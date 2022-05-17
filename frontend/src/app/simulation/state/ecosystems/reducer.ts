import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';
import { createReducer, createSelector, on } from '@ngrx/store';
import * as ecosystemsAction from './actions';

export interface AppState {
  ecosystems: EcosystemDefinition[];
}

export type EcosystemDefinition = GameOfLifeConfig & { name: string };

export const initialState: EcosystemDefinition[] = [];

export const ecosystemReducer = createReducer(
  initialState,
  on(ecosystemsAction.add, (state, payload) => {

    return state.concat(payload);
  })
);
