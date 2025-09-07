import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo, fetchTodos, fetchTodosApiSagaStart } from "../../store/slice/todoSlice";

function TodoList() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentEditedTodoID, setCurrentEditedTodoID] = useState(null);

  const dispatch = useDispatch();
  const { todoList , todoListFromApi , loading} = useSelector((state) => state.todo);

  function handleAddTodo() {
    dispatch(addTodo(currentTodo));
    setCurrentTodo("");
  }

  function handleEditTodo() {
    dispatch(
      editTodo({
        currentEditedTodoID,
        currentTodo,
      })
    );

    setCurrentTodo('')
  }

  function handleDeleteTodo(getCurrentTodoID) {
    dispatch(deleteTodo(getCurrentTodoID));
  }

  function handleUpdateTodo(getCurrentTodo) {
    setCurrentEditedTodoID(getCurrentTodo.id);
    setCurrentTodo(getCurrentTodo.title);
  }
  function fetchListOfTodosFromApiThunk(){
    dispatch(fetchTodos())
  }
  function fetchListOfTodosFromApiSaga(){
    dispatch(fetchTodosApiSagaStart())
  }
  useEffect(()=>{
    //dispatch(fetchTodos())
  },[])

  console.log(todoListFromApi);

  // if(loading){
  //   return <h1>Fetching todos from API ! Please wait</h1>
  // }

  return (
    <div>
      <input
        value={currentTodo}
        onChange={(event) => setCurrentTodo(event.target.value)}
        type="text"
        name="todo"
        placeholder="Enter your todo"
      />
      <button
        disabled={currentTodo === ""}
        onClick={currentEditedTodoID !== null ? handleEditTodo : handleAddTodo}
      >
        {currentEditedTodoID !== null ? "Edit Todo" : "Add Todo"}
      </button>

      <ul>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <li key={todoItem.id}>
                <p>{todoItem.title}</p>
                <button onClick={() => handleDeleteTodo(todoItem.id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateTodo(todoItem)}>
                  Update Todo
                </button>
              </li>
            ))
          : null}
      </ul>
      <button onClick={fetchListOfTodosFromApiThunk}>Fetch List Of Todos From API(Thunk)</button>
      <button onClick={fetchListOfTodosFromApiSaga}>Fetch List Of Todos From API(Saga)</button>
      <ul>
        {
            todoListFromApi && todoListFromApi.length > 0 ?
            todoListFromApi.map(todoItem=> <li key={todoItem.id}>{todoItem.todo}</li>)
            : null
        }
      </ul>
    </div>
  );
}

export default TodoList;
