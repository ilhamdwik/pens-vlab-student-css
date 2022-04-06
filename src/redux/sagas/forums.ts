import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { 
    allForumsApi, 
    forumsDetailApi, 
    createForumsApi, 
    deleteForumsApi 
} from "../../apis";
import { 
  getAllForums, 
  getDetailForums, 
  postCreateForum, 
  deleteForum 
} from "../actions/forumActions";
import { forums } from "../../types";

function* getAllForumSaga({ 
    payload 
}: ReturnType<typeof getAllForums.request>) {
    try {
        const response: AxiosResponse<forums[]> = yield axios.get(allForumsApi);

        payload.onSuccess(response.data);
    } catch (err: any) {
        console.error(err.response);
        payload.onFailure({ message: err?.response?.data } as Error);
    }
}

function* getForumDetailSaga({
    payload,
}: ReturnType<typeof getDetailForums.request>) {
    try {
      const response: AxiosResponse<forums> = yield axios.get(
        forumsDetailApi + payload.id
      );

      payload.onSuccess(response.data);
    } catch (err: any) {
      console.error(err.response);
      payload.onFailure({ message: err?.response?.data } as Error);
    }
}

function* postCreateForumSaga({
    payload,
}: ReturnType<typeof postCreateForum.request>) {
    try {
        const response: AxiosResponse<forums> = yield axios.post(createForumsApi, payload.data);

        payload.onSuccess(response.data);
    } catch (err: any) {
        console.error(err.response);
        payload.onFailure({ message: err?.response?.data } as Error);
    }
}

function* deleteForumSaga({
    payload,
  }: ReturnType<typeof deleteForum.request>) {
    try {
      yield axios.delete(deleteForumsApi + payload.id);
  
      payload.onSuccess();
    } catch (err: any) {
      console.error(err.response);
      payload.onFailure(err);
    }
  }

export default function* forum() {
    yield takeLatest(getAllForums.request, getAllForumSaga);
    yield takeLatest(getDetailForums.request, getForumDetailSaga);
    yield takeLatest(postCreateForum.request, postCreateForumSaga);
    yield takeLatest(deleteForum.request, deleteForumSaga);
}