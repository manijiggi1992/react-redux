//global store

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todoSlice";
import userReducer from "./slice/userSlice";
import { myLogger, blockAction } from "./saga/middleware";
import { watchTodos } from "./saga/todoSaga";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer
  },
  middleware: (getDefault) => {
    return getDefault().concat(sagaMiddleware,myLogger, blockAction)
  }
});

//sagaMiddleware.run(watchTodos);
sagaMiddleware.run(rootSaga);

export default store;
