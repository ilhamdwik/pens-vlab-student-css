import { all } from "redux-saga/effects";
import compiles from "./compiles";
import modules from "./modules";
import auth from "./auth";
import quiz from "./quiz";
import forum from "./forums";
import comment from "./comments";

export default function* root() {
  yield all([compiles(), modules(), auth(), quiz(), forum(), comment()]);
}
