import * as api from "../api";

let uniqId = 1;
export function uniqueId() {
  uniqId += 1;
  return uniqId;
}

export const fetchTasksStarted = () => {
  return {
    type: "FETCH_TASKS_STARTED",
  };
};

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

const createTaskSucceeded = (task) => {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
};

const editTaskSucceeded = (task) => {
  return {
    type: "EDIT_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
};

const progressTimerStart = (taskId) => {
  return {
    type: "TIMER_STARTED",
    payload: {
      taskId,
    },
  };
};

const progressTimerStop = (taskId) => {
  return {
    type: "TIMER_STOPPED",
    payload: {
      taskId,
    },
  };
};

export const filterTasks = (searchTerm) => {
  return {
    type: "FILTER_TASKS",
    payload: {
      searchTerm,
    },
  };
};

/* --------------------------------------- THUNKS --------------------------------------- */

/**
 * fetchTasks NOT used anymore.
 * Used saga instead of thunks
 */
export function fetchTasks() {
  /**
   * Within the fetchTasks action creator, an anonymous function (thunk) is returned.
   * The thunk middleware provides the dispatch and getState arguments, so the body of
   * the function can view the contents of the current store and dispatch new actions
   * to indicate loading, success, or failure states. */
  return (dispatch) => {
    dispatch(fetchTasksStarted());
    try {
      api
        .fetchTasks()
        .then((resp) => {
          setTimeout(() => {
            dispatch(fetchTasksSucceeded(resp.data));
          }, 3000);
          // throw new Error("Oh noes! Unable to fetch tasks!");
        })
        .catch((err) => {
          dispatch(fetchTasksFailed(err.message));
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createTask({
  title,
  description,
  status = "Unstarted",
  timer = 0,
}) {
  return (dispatch) => {
    api.createTask({ title, description, status, timer }).then((resp) => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

const getTaskById = (tasks, id) => {
  return tasks.tasks.find((task) => task.id === id);
};

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks, id);
    const updatedTask = {
      ...task,
      status: params.status,
    };
    api.editTask(id, updatedTask).then((resp) => {
      dispatch(editTaskSucceeded(resp.data));
      if (resp.data.status === "In Progress") {
        dispatch(progressTimerStart(resp.data.id));
      }
      if (task.status === "In Progress") {
        // Stops the timer if the task was “In Progress” prior to updating
        dispatch(progressTimerStop(resp.data.id));
      }
    });
  };
}
