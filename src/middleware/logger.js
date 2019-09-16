// store — The redux store. You can use the store object directly in
//         middleware when you need to make decisions based on an
//         existing state. store.getState has you covered.
// next — The next command, provided to us by Redux, is a way to
//        signify when this middleware has completed its work and
//        it’s time to move on to the next middleware in the chain (if there is one). 
// action — The action being dispatched. Generally, your middleware
//          will do something with every action (such as logging) or
//          watch for a specific action by checking the value of action.type.

const logger = store => next => action => {
  console.group(action.type);
  console.log('dispatching: ', action);
  const result = next(action);
  console.log('next state: ', store.getState());
  console.groupEnd(action.type);
  return result;
};

export default logger;