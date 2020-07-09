const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Dispatching: ", action);
  const result = next(action);
  console.log("Next state: ", store.getState());
  console.groupEnd(action.type);
  return result;
};

export default logger;
