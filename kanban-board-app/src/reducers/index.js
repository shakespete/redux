const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  searchTerm: "",
};

export function getFilteredTasks(tasks, searchTerm) {
  return tasks.filter((task) => {
    return task.title.match(new RegExp(searchTerm, "i"));
  });
}

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_TASKS": {
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    }
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
      };
    }
    case "TIMER_INCREMENT": {
      const nextTasks = state.tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, timer: task.timer + 1 };
        }
        return task;
      });
      return {
        ...state,
        tasks: nextTasks,
      };
    }
    case "FETCH_TASKS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_TASKS_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    }
    case "FETCH_TASKS_FAILED": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
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
