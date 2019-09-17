import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const CALL_API = 'CALL_API';

const makeCall = (endpoint) => {
  const url = `${API_BASE_URL}${endpoint}`;

  return axios
    .get(url)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      return err;
    });
}

const apiMiddleware = store => next => action => {
  console.group('ACTION');
  console.log(action);
  console.groupEnd();
  const callApi = action[CALL_API];
  if (typeof callApi === 'undefined') {
    return next(action);
  }

  const [requestStartedType, successType, failureType] = callApi.types;

  // Because next will ultimately dispatch an action to the store, you pass
  // it an action object the same way you would if you were using store.dispatch.
  // The result is identical to the old strategy of dispatching FETCH_TASKS_STARTED
  // directly within the fetchTasks action. The reducer will update the correct state
  // in response to the action, and the app will know to render a loading indicator.
  next({ type: requestStartedType });
  return makeCall(callApi.endpoint).then(
    response =>
      next({
        type: successType,
        payload: response.data,
      }),
    error =>
      next({
        type: failureType,
        error: error.message,
      }),
  );
}

export default apiMiddleware;