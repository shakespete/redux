const initialState = {
  tasks: [],
  isLoading: false,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TASK": {
      return { tasks: state.tasks.concat(action.payload) };
    }
    case "EDIT_TASK_SUCCEEDED": {
      const { payload } = action;
      const nextTasks = state.tasks.map((task) => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });

      return {
        ...state,
        tasks: nextTasks,
      }
    }
    case "FETCH_TASKS_STARTED": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "FETCH_TASKS_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    }
    case "CREATE_TASK_SUCCEEDED": {
      return {
        ...state,
        tasks: state.tasks.concat(action.payload.task),
      };
    }
    default: {
      return state;
    }
  }
};

export default tasks;
