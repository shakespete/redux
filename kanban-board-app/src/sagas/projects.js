import { call, delay, put, takeLatest } from "redux-saga/effects";
import * as api from "../api";

const fetchProjectsSucceeded = (projects) => {
  return {
    type: "FETCH_PROJECTS_SUCCEEDED",
    payload: {
      projects,
    },
  };
};

const fetchProjectsFailed = (error) => {
  return {
    type: "FETCH_PROJECTS_FAILED",
    payload: {
      error,
    },
  };
};

function* fetchProjectsSaga() {
  try {
    yield delay(3000);
    const { data } = yield call(api.fetchProjects);
    // put is used to dispatch an action.
    yield put(fetchProjectsSucceeded(data));
  } catch (e) {
    yield put(fetchProjectsFailed(e.message));
  }
}

export default function* projectsSaga() {
  console.log("%cProjects sagas started", "color: #0095fe");
  yield takeLatest("FETCH_PROJECTS_STARTED", fetchProjectsSaga);
}
