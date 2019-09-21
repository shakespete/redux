import { call, takeLatest, put } from 'redux-saga/effects';
import * as api from '../api'; 
// Because it’s simpler to keep track of a single entry point,
// the root saga’s role will be to coordinate all other sagas
// used in the application.
export default function* rootSaga() {
  // Forking each watcher allows rootSaga to move on to the next one.
  // Each watcher is also a generator.
  /*
  yield fork(watchFetchTasks);
  yield fork(watchSomethingElse);
  */
  // What’s fork doing here? When rootSaga executes, it’s going to
  // pause at every yield statement until the side effect is completed.
  // The fork method, however, allows rootSaga to move onto the next
  // yield without a resolution.
  // Each of these forks are said to be non-blocking. This implementation
  // makes sense, because you want to kick off all the watchers at
  // initialization, not only the first in the list.
  
  yield takeLatest('FETCH_TASKS_STARTED', fetchTasks);
}

// Sagas return effects, which are instructions for the saga middleware to perform.
// Effects are plain objects.
function* fetchTasks() {
  try {
    const { data } = yield call(api.fetchTasks);
    yield put({
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: { tasks: data }
    });
  } catch (e) {
    yield put({
        type: 'FETCH_TASKS_FAILED',
        payload: { error: e.message }
    });
  }
}

// One common misconception for newcomers is that the logic you write 
// within a saga needs to do the processing of your side effect, such 
// as performing an AJAX request. That’s not the case! Instead, the 
// saga’s role is to return a description of the logic needed in the 
// form of an object.