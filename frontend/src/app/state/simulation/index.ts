import { ActionReducer } from '@ngrx/store';
import { ToAppState } from 'src/utils/generics';
import { clipboardReducer } from './clipboard/reducer';
import { ecosystemReducer } from './ecosystems/reducer';
import { panelReducer } from './panel/reducer';

export const SimulationReducers = {
  panel: panelReducer,
  clipboard: clipboardReducer,
  ecosystems: ecosystemReducer,
};

