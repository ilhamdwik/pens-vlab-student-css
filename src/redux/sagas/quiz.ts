import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { quizApi, quizDetailApi, submitQuizApi } from "../../apis";
import { getDetailQuiz, getQuiz, postSubmitQuiz } from "../actions/quizActions";
import { student_to_quiz } from "../../types";

function* getQuizSaga({ payload }: ReturnType<typeof getQuiz.request>) {
  try {
    const response: AxiosResponse<student_to_quiz[]> = yield axios.get(quizApi);

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
  }
}

function* getQuizDetailSaga({
  payload,
}: ReturnType<typeof getDetailQuiz.request>) {
  try {
    const response: AxiosResponse<student_to_quiz> = yield axios.get(
      quizDetailApi + payload.id
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
  }
}

function* postSubmitQuizSaga({
  payload,
}: ReturnType<typeof postSubmitQuiz.request>) {
  try {
    yield axios.post(submitQuizApi + payload.id, payload.data);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
  }
}

export default function* quiz() {
  yield takeLatest(getQuiz.request, getQuizSaga);
  yield takeLatest(getDetailQuiz.request, getQuizDetailSaga);
  yield takeLatest(postSubmitQuiz.request, postSubmitQuizSaga);
}
