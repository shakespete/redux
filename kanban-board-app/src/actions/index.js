let uniqId = 1;
export function uniqueId() {
  uniqId += 1;
  return uniqId;
}

export function createTask({ title, description }) {
  return {
    type: "CREATE_TASK",
    payload: {
      id: uniqueId(),
      title,
      description,
      status: "Unstarted",
    },
  };
}
