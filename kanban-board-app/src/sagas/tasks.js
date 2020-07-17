import { channel } from "redux-saga";
import { call, delay, put, take, takeLatest } from "redux-saga/effects";
import * as api from "../api";

const fetchTasksSucceeded = (tasks) => {
  return {
    type: "FETCH_TASKS_SUCCEEDED",
    payload: {
      tasks,
    },
  };
};

const fetchTasksFailed = (error) => {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: {
      error,
    },
  };
};

function* fetchTasksSaga() {
  try {
    yield delay(3000);
    const { data } = yield call(api.fetchTasks);
    // put is used to dispatch an action.
    yield put(fetchTasksSucceeded(data));
  } catch (e) {
    yield put(fetchTasksFailed(e.message));
  }
}

function* handleProgressTimerSaga({ payload, type }) {
  if (type === "TIMER_STARTED") {
    while (true) {
      yield delay(1000);
      yield put({
        type: "TIMER_INCREMENT",
        payload: { taskId: payload.taskId },
      });
    }
  }
}

function* takeLatestById(actionType, saga) {
  const channelsMap = {};

  while (true) {
    const action = yield take(actionType);
    const { taskId } = action.payload;

    if (!channelsMap[taskId]) {
      channelsMap[taskId] = channel();
      yield takeLatest(channelsMap[taskId], saga);
    }

    yield put(channelsMap[taskId], action);
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
export default function* tasksSaga() {
  console.log("%cTasks sagas started", "color: green");
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasksSaga);
  yield takeLatestById(
    ["TIMER_STARTED", "TIMER_STOPPED"],
    handleProgressTimerSaga
  );
}
