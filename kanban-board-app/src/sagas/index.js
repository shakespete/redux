import { call, put, delay, takeEvery, takeLatest } from "redux-saga/effects";
import * as api from "../api";

function* fetchTasks() {
  try {
    yield delay(3000);
    const { data } = yield call(api.fetchTasks);
    // put is used to dispatch an action.
    yield put({
      type: "FETCH_TASKS_SUCCEEDED",
      payload: { tasks: data },
    });
  } catch (e) {
    yield put({
      type: "FETCH_TASKS_FAILED",
      payload: { error: e.message },
    });
  }
}

function* handleProgressTimer({ payload }) {
  while (true) {
    yield delay(1000);
    yield put({
      type: "TIMER_INCREMENT",
      payload: { taskId: payload.taskId },
    });
  }
}

/**
 * What’s fork doing here? When rootSaga executes, it’s going to pause at
 * every yield statement until the side effect is completed. The fork method,
 * however, allows rootSaga to move onto the next yield without a resolution.
 * Each of these forks are said to be non-blocking. This implementation makes
 * sense, because you want to kick off all the watchers at initialization,
 * not only the first in the list.
 *
 * takeLatest is creating a fork with extra functionality.
 */
export default function* rootSaga() {
  console.log("%cwatchers started", "color: green");
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasks);
  yield takeEvery("TIMER_STARTED", handleProgressTimer);
}
