import { ActionType } from "typesafe-actions";
import * as appActions from "./appActions";
import * as authActions from "./authActions";
import * as compileActions from "./compileActions";
import * as moduleActions from "./moduleActions";
import * as quizActions from "./quizActions";
import * as forumActions from "./forumActions";
import * as commentActions from "./commentActions";

export type AppAction = ActionType<typeof appActions>;
export type CompileAction = ActionType<typeof compileActions>;
export type AuthAction = ActionType<typeof authActions>;
export type ModuleAction = ActionType<typeof moduleActions>;
export type QuizAction = ActionType<typeof quizActions>;
export type ForumAction = ActionType<typeof forumActions>;
export type CommentAction = ActionType<typeof commentActions>;

export type RootAction =
  | AppAction
  | AuthAction
  | CompileAction
  | ModuleAction
  | QuizAction
  | ForumAction
  | CommentAction;
