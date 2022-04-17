import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { 
    getCommentsApi, 
    postCommentsApi, 
    deleteCommentsApi 
} from "../../apis";
import { 
    getComments, 
    postCreateComment, 
    deleteComment 
} from "../actions/commentActions";
import { comments } from "../../types";

function* getCommentSaga({
    payload
}: ReturnType<typeof getComments.request>) {
    try {
        const response: AxiosResponse<comments[]> = yield axios.get(getCommentsApi);

        payload.onSuccess(response.data);
    } catch (err: any) {
        console.error(err.response);
        payload.onFailure({ message: err?.message.data } as Error);
    }
}

function* postCommentSaga({
    payload,
}: ReturnType<typeof postCreateComment.request>) {
    try {
        const response: AxiosResponse<comments> = yield axios.post(postCommentsApi, payload.data);

        payload.onSuccess(response.data);
    } catch (err: any) {
        console.error(err.response);
        payload.onFailure({ message: err?.response.data } as Error);
    }
}

function* deleteCommentSaga({
    payload,
}: ReturnType<typeof deleteComment.request>) {
    try {
        yield axios.delete(deleteCommentsApi + payload.id);

        payload.onSuccess();
    } catch (err: any) {
        console.error(err.response);
        payload.onFailure(err);
    }
}

export default function* comment() {
    yield takeLatest(getComments.request, getCommentSaga);
    yield takeLatest(postCreateComment.request, postCommentSaga);
    yield takeLatest(deleteComment.request, deleteCommentSaga);
}