
const initialState = {
  tasks: [],
  isLoading: false, 
};

export function tasksReducer(state = initialState, action) {
  console.log("2: TASKS REDUCER");
  console.log(state);
  switch (action.type) {
    case 'FETCH_TASKS_STARTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'FETCH_TASKS_SUCCEEDED': {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    }
    case 'CREATE_TASK_SUCCEEDED': {
      return {
        ...state, // Includes any existing state when updating the list of tasks
        tasks: state.tasks.concat(action.payload.task),
      };
    }
    case 'EDIT_TASK_SUCCEEDED': {
      const { payload } = action;

      const nextTasks = state.tasks.map(task => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });
      return {
        ...state, // Includes any existing state when updating the list of tasks
        tasks: nextTasks,
      }
    }
    default: {
      return state;
    }
  }
}