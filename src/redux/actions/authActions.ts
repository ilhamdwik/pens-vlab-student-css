import { createAction, createAsyncAction } from "typesafe-actions";
import { User } from "../reducers/authReducer";

export const setUser = createAction("SET_USER", (user?: User) => user)();
export const setToken = createAction(
  "SET_TOKEN",
  (token: string | null) => token
)();

export const fetchUserCheck = createAsyncAction(
  "USER_CHECK_REQUEST",
  "USER_CHECK_SUCCESS",
  "USER_CHECK_ERROR"
)<
  {
    data: {
      token: string;
      userCas: {
        email: string;
        nip?: string;
        nrp?: string;
      };
    };
    onSuccess: (res: string) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
