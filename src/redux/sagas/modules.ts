import { takeLatest } from "redux-saga/effects";
import {
  fetchCourseDetail,
  fetchCourseList,
  fetchLesson,
  fetchUpdateProgress,
} from "../actions/moduleActions";
import axios, { AxiosResponse } from "axios";
import { Course, Courses, Lesson } from "../../types";
import { courseApi, lessonApi, updateLessonProgressApi } from "../../apis";

function* courseListSaga({
  payload,
}: ReturnType<typeof fetchCourseList.request>) {
  try {
    const response: AxiosResponse<Courses> = yield axios.get(courseApi);

    payload.onSuccess(response.data);
  } catch (err: any) {
    payload.onFailure(err);
  }
}

function* courseDetailSaga({
  payload,
}: ReturnType<typeof fetchCourseDetail.request>) {
  try {
    const response: AxiosResponse<Course> = yield axios.get(
      `${courseApi}/${payload.id}`
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    payload.onFailure(err);
  }
}

function* lessonSaga({ payload }: ReturnType<typeof fetchLesson.request>) {
  try {
    const response: AxiosResponse<Lesson> = yield axios.get(
      `${lessonApi}/${payload.id}`
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    payload.onFailure(err);
  }
}

function* updateProgressSaga({
  payload,
}: ReturnType<typeof fetchUpdateProgress.request>) {
  try {
    const response: AxiosResponse<string> = yield axios.post(
      updateLessonProgressApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    payload.onFailure(err);
  }
}

export default function* modules() {
  yield takeLatest(fetchCourseList.request, courseListSaga);
  yield takeLatest(fetchCourseDetail.request, courseDetailSaga);
  yield takeLatest(fetchLesson.request, lessonSaga);
  yield takeLatest(fetchUpdateProgress.request, updateProgressSaga);
}
