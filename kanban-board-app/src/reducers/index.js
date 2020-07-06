const tasks = (state = { tasks: [] }, action) => {
  if (action.type === "FETCH_TASKS_SUCCEEDED") {
    return {
      tasks: action.payload.tasks,
    };
  }
  if (action.type === "CREATE_TASK") {
    return { tasks: state.tasks.concat(action.payload) };
  }
  if (action.type === "EDIT_TASK") {
    const { payload } = action;
    return {
      tasks: state.tasks.map((task) => {
        if (task.id === payload.id) {
          return {
            ...task,
            status: payload.params.status,
          };
        }
        return task;
      }),
    };
  }
  return state;
};

export default tasks;
