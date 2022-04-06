import { createAsyncAction } from "typesafe-actions";
import { comments } from "../../types";

export const getComments = createAsyncAction(
    "GET_COMMENT_REQUEST",
    "GET_COMMENT_SUCCESS",
    "GET_COMMENT_ERROR"
)<
    {
        onSuccess: (res: comments[]) => void;
        onFailure: (res: Error) => void;
    },
    string,
    Error
>();

export const postCreateComment = createAsyncAction(
    "REQUEST_POST_CREATE_COMMENT",
    "SUCCESS_POST_CREATE_COMMENT",
    "ERROR_POST_CREATE_COMMENT"
)<
    {
        data: {
            student_id: string;
            forum_id: string;
            answer: string;
        };
        onSuccess: (res: comments) => void;
        onFailure: (res: Error) => void;
    },
    string,
    Error
>();

export const deleteComment = createAsyncAction(
    "REQUEST_DELETE_COMMENT",
    "SUCCESS_DELETE_COMMENT",
    "ERROR_GET_DELETE_COMMENT"
)<
    {
        id: string;
        onSuccess: () => void;
        onFailure: (err: Error) => void;
    },
    string,
    Error
>();