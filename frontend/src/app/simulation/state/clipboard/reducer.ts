import { createReducer, createSelector, on } from '@ngrx/store';
import * as clipBoardAction from './actions';

export interface AppState {
  clipboard: Clipboard;
}

export type ClipboardData = {
  contentType: string;
  content: string;
};

export const initialState: ClipboardData = { contentType: '', content: '' };

export const clipboardReducer = createReducer(
  initialState,
  on(clipBoardAction.write, (state, payload) => {
    return payload;
  })
);
