import { createAction, createAsyncAction } from "typesafe-actions";
import { EtholStudent } from "../../types";
import { User } from "../reducers/authReducer";

export const setUser = createAction("SET_USER", (user?: User) => user)();
export const setToken = createAction("SET_TOKEN", (token?: string) => token)();

export const fetchUserCheck = createAsyncAction(
  "USER_CHECK_REQUEST",
  "USER_CHECK_SUCCESS",
  "USER_CHECK_ERROR"
)<
  {
    data: {
      token: string;
      userDetail: EtholStudent;
    };
    onSuccess: (res: string) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const fetchEtholUserDetail = createAsyncAction(
  "ETHOL_USER_REQUEST",
  "ETHOL_USER_SUCCESS",
  "ETHOL_USER_ERROR"
)<
  {
    token: string;
    onSuccess: (res: EtholStudent) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
