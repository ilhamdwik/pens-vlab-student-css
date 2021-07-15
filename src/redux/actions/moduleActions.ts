import { createAsyncAction } from "typesafe-actions";
import { Course, Courses, Lesson } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */

export const fetchCourseList = createAsyncAction(
  "FETCH_COURSE_LIST",
  "FETCH_COURSE_LIST_SUCCESS",
  "FETCH_COURSE_LIST_ERROR"
)<
  {
    onSuccess: (res: Courses) => void;
    onFailure: (err: Error) => void;
  },
  Courses,
  Error
>();

export const fetchCourseDetail = createAsyncAction(
  "FETCH_COURSE_DETAIL",
  "FETCH_COURSE_DETAIL_SUCCESS",
  "FETCH_COURSE_DETAIL_ERROR"
)<
  {
    id: string;
    onSuccess: (res: Course) => void;
    onFailure: (err: Error) => void;
  },
  Course,
  Error
>();

export const fetchLesson = createAsyncAction(
  "FETCH_LESSON",
  "FETCH_LESSON_SUCCESS",
  "FETCH_LESSON_ERROR"
)<
  {
    id: string;
    onSuccess: (res: Lesson) => void;
    onFailure: (err: Error) => void;
  },
  Lesson,
  Error
>();

export const fetchUpdateProgress = createAsyncAction(
  "FETCH_UPDATE_PROGRESS",
  "FETCH_UPDATE_PROGRESS_SUCCESS",
  "FETCH_UPDATE_PROGRESS_ERROR"
)<
  {
    data: {
      id: string;
      answer: string;
      code: string;
    };
    onSuccess: (res: string) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
