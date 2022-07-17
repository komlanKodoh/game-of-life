import { createReducer, on } from '@ngrx/store';
import { GameOfLifeConfig } from 'game-of-life-engine';
import * as ecosystemsAction from './actions';


export type EcosystemDefinition = GameOfLifeConfig & { name?: string };

export const initialState: EcosystemDefinition[] = [];

export const ecosystemReducer = createReducer(
  initialState,
  on(ecosystemsAction.addEcosystems, (state, payload) => {

    return state.concat(payload);
  })
);
