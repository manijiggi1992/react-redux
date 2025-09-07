import { call, delay, fork, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import {
  fetchTodosApiSagaFailure,
  fetchTodosApiSagaStart,
  fetchTodosApiSagaSuccess,
} from "../slice/todoSlice";

//API Function
function fetchTodosApi() {
  return fetch("https://dummyjson.com/todos").then((res) => res.json());
}

//Worker saga(performs the task)
function* fetchTodoWorker() {
  try {
    yield delay(2000);
    const data = yield call(fetchTodosApi); //call - runfunction, wait for result
    yield put(fetchTodosApiSagaSuccess(data));
  } catch (error) {
    yield put(fetchTodosApiSagaFailure());
  }
}

export function* watchTodosSaga() {
  //yield takeLatest(fetchTodosApiSagaStart.type, fetchTodoWorker);
  //yield takeEvery(fetchTodosApiSagaStart.type, fetchTodoWorker);
  yield takeLeading(fetchTodosApiSagaStart.type, fetchTodoWorker);
  //yield fork(fetchTodosApiSagaStart.type, fetchTodoWorker);
}
