import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import {tasksReducer} from './reducers';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';

// Redux’s createStore function takes up to three arguments: a reducer,
// an initial state, and an enhancer. In the case that only two arguments
// are passed, Redux presumes the second argument is an enhancer and there’s
// no initial state.

//json-server --watch db.json --port 3001

// A rootReducer function accepts the current
// state of the store and an action.
const rootReducer = (state = {}, action) => {
  console.group("1: ROOT REDUCER");
  console.log(state);
  console.groupEnd();
  return {
    tasks: tasksReducer(state.tasks, action),
    // projects: projectsReducer(state.projects, action),
  };
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

// It may be helpful to think of sagas as subprograms, and the run function on
// the last line of the listing is required for the subprogram to begin watching
// for actions. Once the saga middleware is configured, you can run the top-level,
// or root, saga.
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  // The <Provider /> makes the Redux store available to any nested
  // components that have been wrapped in the connect() function.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
