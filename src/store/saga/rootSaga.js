import { all } from "redux-saga/effects";
import { watchTodosSaga } from "./todoSaga";
import { watchUserSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([
    watchTodosSaga(),  // runs todos saga
    watchUserSaga(),  // runs users saga
  ]);
}
