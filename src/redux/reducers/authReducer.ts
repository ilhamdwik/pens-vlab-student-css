import { createReducer } from "typesafe-actions";
import { AuthAction } from "../actions/actionTypes";
import { setUser, setToken } from "../actions/authActions";

export type User = {
  email: string;
  id: string;
  class_id: string;
  name: string;
  nrp: string;
  avatar_url?: string;
};

export interface AuthState {
  user?: User;
  token?: string;
}

const initialState: AuthState = {};

const authReducer = createReducer<AuthState, AuthAction>(initialState)
  .handleAction(setUser, (state, action) => ({
    ...state,
    user: action.payload,
  }))
  .handleAction(setToken, (state, action) => ({
    ...state,
    token: action.payload,
  }));

export default authReducer;
