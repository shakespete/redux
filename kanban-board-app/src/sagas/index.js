import { fork } from "redux-saga/effects";
import tasksSaga from "./tasks";

/**
 * What’s fork doing here? When rootSaga executes, it’s going to pause at
 * every yield statement until the side effect is completed. The fork method,
 * however, allows rootSaga to move onto the next yield without a resolution.
 * Each of these forks are said to be non-blocking. This implementation makes
 * sense, because you want to kick off all the watchers at initialization,
 * not only the first in the list.
 */
export default function* rootSaga() {
  yield fork(tasksSaga);
}
