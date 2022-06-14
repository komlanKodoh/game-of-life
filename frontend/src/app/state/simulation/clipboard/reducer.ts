import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';
import { createReducer, createSelector, on } from '@ngrx/store';
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
