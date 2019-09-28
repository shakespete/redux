import * as api from '../api'; 

/* -- REPLACED BY SAGA --
export const fetchTasksStarted = () => {
  return {
    type: 'FETCH_TASKS_STARTED',
  };
}
export const fetchTasksStarted = () => {
  return {
    type: 'FETCH_TASKS_STARTED',
  };
}
export const fetchTasksSucceeded = tasks => {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks
    }
  }
}
function fetchTasksFailed(error) {
  return {
    type: 'FETCH_TASKS_FAILED',
    payload: {
      error,
    },
  };
}

// Within the fetchTasks action creator, an anonymous function (thunk)
// is returned. The thunk middleware provides the dispatch and getState
// arguments, so the body of the function can view the contents of the
// current store and dispatch new actions to indicate loading, success,
// or failure states.
export const fetchTasks = () => {
  return (dispatch, getState) => {  // The action creator returns a function, also known as a thunk.
    dispatch(fetchTasksStarted());  // Within the thunk, more action creators can be dispatched.

    api.fetchTasks().then(resp => {
      setTimeout(() => {
        // Based on the results of a side effect, more dispatching may occur.
        dispatch(fetchTasksSucceeded(resp.data)); 
      }, 2000);
      // throw new Error('Oh noes! Unable to fetch tasks!');
    })
    .catch(err => {
      dispatch(fetchTasksFailed(err.message));
    });
  }
}

export const fetchTasks = () => {
  return (dispatch, getState) => {
    dispatch(fetchTasksStarted())
  }
}
*/

export const fetchTasks = () => {
  console.log('FETCH_TASKS_STARTED');
  return {
    type: 'FETCH_TASKS_STARTED',
  };
}
const createTaskSucceeded = (task) => {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}
export const createTask = ({ title, description, status = 'Unstarted' }) => {
  return dispatch => {
    api.createTask({ title, description, status }).then(resp => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

const getTaskById = (tasks, id) => {
  return tasks.find(task => task.id === id);
}
const editTaskSucceeded = (task) => {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}
export const editTask = (id, params = {}) => {
  return (dispatch, getState) => {
    console.log(getState());
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);

    api.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));
    });
  }
}