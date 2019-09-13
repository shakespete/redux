import * as api from '../api'; 

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
export const fetchTasks = () => {
  return dispatch => {
    dispatch(fetchTasksStarted());

    api.fetchTasks().then(resp => {
      setTimeout(() => {
        dispatch(fetchTasksSucceeded(resp.data));
      }, 2000);
    });
  }
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