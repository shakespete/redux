import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from './middleware/logger';
import analytics from './middleware/analytics';
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
  console.log("1: ROOT REDUCER");
  console.log(state);
  return {
    tasks: tasksReducer(state.tasks, action),
    // projects: projectsReducer(state.projects, action),
  };
};


// Redux middleware is code that sits between an action being dispatched and
// the store passing the action to the reducer and broadcasting the updated state.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger, analytics))
);

ReactDOM.render(
  // The <Provider /> makes the Redux store available to any nested
  // components that have been wrapped in the connect() function.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
