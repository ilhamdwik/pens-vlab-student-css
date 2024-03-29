import { createAction } from "typesafe-actions";
import { AppReducerState } from "../reducers/appReducer";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const setStoreState = createAction(
  "APP_SET_STORE_STATE",
  (state: Partial<AppReducerState>) => state
)();

export const toggleDarkMode = createAction(
  "TOGGLE_DARK_MODE",
  (dark: boolean) => dark
)();

export const setPlaygroundCode = createAction(
  "SET_PLAYGROUND_CODE",
  (code: string | null) => code
)();
