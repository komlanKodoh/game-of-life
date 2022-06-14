import { AppState } from "../..";

export const selectClipBoardContent = (state: AppState) => state.simulation.clipboard;
