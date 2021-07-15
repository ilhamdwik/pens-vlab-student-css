import {
  setPlaygroundCode,
  setStoreState,
  toggleDarkMode,
} from "../actions/appActions";
import { createReducer } from "typesafe-actions";
import { AppAction } from "../actions/actionTypes";

export interface AppReducerState {
  version: string;
  dark: boolean;
  playgroundCode: string | null;
}

const initialState: AppReducerState = {
  version: "1.0.0",
  dark: false,
  playgroundCode: null,
};

const appReducer = createReducer<AppReducerState, AppAction>(initialState)
  .handleAction(setStoreState, (state, action) =>
    Object.assign({}, initialState, state, action.payload)
  )
  .handleAction(toggleDarkMode, (state, action) => ({
    ...state,
    dark: action.payload,
  }))
  .handleAction(setPlaygroundCode, (state, action) => ({
    ...state,
    playgroundCode: action.payload,
  }));

export default appReducer;
