import * as api from "../api";

let uniqId = 1;
export function uniqueId() {
  uniqId += 1;
  return uniqId;
}

const fetchTasksSucceeded = (tasks) => {
  return {
    type: "FETCH_TASKS_SUCCEEDED",
    payload: {
      tasks,
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

export function fetchTasks() {
  return (dispatch) => {
    api.fetchTasks().then((resp) => {
      dispatch(fetchTasksSucceeded(resp.data));
    });
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
  return tasks.find((task) => task.id === id);
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
