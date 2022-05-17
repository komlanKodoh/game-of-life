import { AppState } from './reducer';

export const selectClipBoardContent = (state: AppState) => state.clipboard;
