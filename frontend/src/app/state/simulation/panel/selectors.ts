import { AppState } from "../..";


export const selectPanelIsOpen = (state: AppState) => state.simulation.panel.isOpen;

export const selectPanelState = (state: AppState) => state.simulation.panel;
