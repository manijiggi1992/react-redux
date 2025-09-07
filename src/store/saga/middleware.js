// Custom logger middleware
export const myLogger = (store) => (next) => (action) => {
  console.log("Action Dispatched:", action);
  let result = next(action); // Pass to next middleware/reducer
  console.log("New State:", store.getState());
  return result;
};

// Block negative numbers
export const blockAction = (store) => (next) => (action) => {
  console.log("blockAction", store.getState().todo.todoList, action);
  if (action.type === "todos/deleteTodo") {
    console.warn("Middleware - Not allowing delete action!");
    return; // Stop here
  }
  return next(action);
};
