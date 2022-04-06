import { createAsyncAction } from "typesafe-actions";
import { forums } from "../../types";

export const getAllForums = createAsyncAction(
    "GET_FORUM_REQUEST",
    "GET_FORUM_SUCCESS",
    "GET_FORUM_ERROR"
)<
    {
      onSuccess: (res: forums[]) => void;
      onFailure: (err: Error) => void;
    },
    string,
    Error
>();

export const getDetailForums = createAsyncAction(
    "GET_DETAIL_FORUM_REQUEST",
    "GET_DETAIL_FORUM_SUCCESS",
    "GET_DETAIL_FORUM_ERROR"
)<
    {
        id: string;
        onSuccess: (res: forums) => void;
        onFailure: (err: Error) => void;
    },
    string,
    Error
>();

export const postCreateForum = createAsyncAction (
    "REQUEST_POST_CREATE_FORUM",
    "SUCCESS_POST_CREATE_FORUM",
    "ERROR_POST_CREATE_FORUM"
)<
    {
        data: {
            author_id: string,
            class_id: string,
            question: string,
        };
        onSuccess: (res: forums) => void;
        onFailure: (err: Error) => void;
    }, 
    string,
    Error
>();

export const deleteForum = createAsyncAction(
    "REQUEST_DELETE_FORUM",
    "SUCCESS_DELETE_FORUM",
    "ERROR_GET_DELETE_FORUM"
  )<
    {
      id: string;
      onSuccess: () => void;
      onFailure: (err: Error) => void;
    },
    string,
    Error
  >();