import { createAsyncAction } from "typesafe-actions";
import { student_to_quiz } from "../../types";

export const getQuiz = createAsyncAction(
  "GET_QUIZ_REQUEST",
  "GET_QUIZ_SUCCESS",
  "GET_QUIZ_ERROR"
)<
  {
    onSuccess: (res: student_to_quiz[]) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getDetailQuiz = createAsyncAction(
  "GET_DETAIL_QUIZ_REQUEST",
  "GET_DETAIL_QUIZ_SUCCESS",
  "GET_DETAIL_QUIZ_ERROR"
)<
  {
    id: string;
    onSuccess: (res: student_to_quiz) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postSubmitQuiz = createAsyncAction(
  "POST_SUBMIT_QUIZ_REQUEST",
  "POST_SUBMIT_QUIZ_SUCCESS",
  "POST_SUBMIT_QUIZ_ERROR"
)<
  {
    id: string;
    data: {
      answer: string;
      code: string;
    };
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
