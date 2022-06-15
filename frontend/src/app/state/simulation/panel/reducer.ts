import { createReducer, createSelector, on } from '@ngrx/store';
import * as panelAction from './actions';


export interface PanelState {
  isOpen: boolean;
}

export const initialState: PanelState = { isOpen: false };

export const panelReducer = createReducer(
  initialState,
  on(panelAction.togglePanel, (state, action) => {
    return { ...state, isOpen: !state.isOpen };
  })
);


