import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUsersStart, fetchUsersSuccess } from "../slice/userSlice";

async function fetchUsersApi() {
  return await fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());
}

function* fetchUsersWorker() {
  const data = yield call(fetchUsersApi);
  yield put(fetchUsersSuccess(data));
}

export function* watchUserSaga() {
  yield takeLatest(fetchUsersStart.type, fetchUsersWorker);
}
