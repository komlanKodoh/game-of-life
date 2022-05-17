import { clipboardReducer } from "./clipboard/reducer";
import { ecosystemReducer } from "./ecosystems/reducer";
import { panelReducer } from "./panel/reducer";


export const StoreRoot = {
    panel: panelReducer,
    clipboard: clipboardReducer,
    ecosystems: ecosystemReducer,
}

