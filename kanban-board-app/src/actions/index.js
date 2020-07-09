import * as api from "../api";

let uniqId = 1;
export function uniqueId() {
  uniqId += 1;
  return uniqId;
}

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

const fetchTasksStarted = () => {
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

export function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksStarted());

    try {
      api
        .fetchTasks()
        .then((resp) => {
          setTimeout(() => {
            dispatch(fetchTasksSucceeded(resp.data));
          }, 2000);
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

export function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    api.createTask({ title, description, status }).then((resp) => {
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
    });
  };
}
