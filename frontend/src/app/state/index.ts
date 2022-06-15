import { userReducer } from './user/reducer';
import { combineReducers } from '@ngrx/store';
import { ToAppState } from 'src/utils/generics';
import { SimulationReducers } from './simulation';
import { EcosystemRecordEffects } from './user/effects';

export const StoreRoot = {
  user: userReducer,
  simulation: combineReducers(SimulationReducers),
};

export const StoreEffects = [EcosystemRecordEffects]

export type AppState = ToAppState<typeof StoreRoot>;
