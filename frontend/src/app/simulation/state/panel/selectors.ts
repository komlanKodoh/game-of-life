import { AppState } from './reducer';

export const selectPanelIsOpen = (state: AppState) => state.panel.isOpen;

export const selectPanelState = (state: AppState) => state.panel;
