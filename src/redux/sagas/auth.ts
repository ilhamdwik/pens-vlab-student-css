import { put, takeLatest } from "redux-saga/effects";
import {
  fetchEtholUserDetail,
  fetchUserCheck,
  setUser,
} from "../actions/authActions";
import axios, { AxiosResponse } from "axios";
import { etholUserDetailApi, userCheckApi } from "../../apis";
import jwt from "jsonwebtoken";
import { User } from "../reducers/authReducer";
import { EtholStudent } from "../../types";

function* userCheckSaga({
  payload,
}: ReturnType<typeof fetchUserCheck.request>) {
  try {
    const response: AxiosResponse<{ token: string }> = yield axios.post(
      userCheckApi,
      payload.data
    );

    const decoded = jwt.decode(response.data.token) as User;

    yield put(setUser(decoded));

    payload.onSuccess(response.data.token);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
  }
}

function* fetchEtholUser({
  payload,
}: ReturnType<typeof fetchEtholUserDetail.request>) {
  try {
    const response: AxiosResponse<EtholStudent> = yield axios.get(
      etholUserDetailApi,
      {
        headers: {
          token: payload.token,
        },
      }
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
  }
}

export default function* auth() {
  yield takeLatest(fetchUserCheck.request, userCheckSaga);
  yield takeLatest(fetchEtholUserDetail.request, fetchEtholUser);
}
