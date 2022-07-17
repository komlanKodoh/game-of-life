import { createReducer, createSelector, on } from '@ngrx/store';
import { GameOfLifeConfig } from 'game-of-life-engine';
import * as clipBoardAction from './actions';


export type ClipboardData = {
  contentType: string;
  content: GameOfLifeConfig | null ;
};

export const initialState: ClipboardData = { contentType: '', content: null };

export const clipboardReducer = createReducer(
  initialState,
  on(clipBoardAction.write, (state, payload) => {
    return payload;
  })
);
