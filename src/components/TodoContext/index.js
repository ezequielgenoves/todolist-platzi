import { createContext, useState } from "react";
import { UseLocalStorage } from "./useLocalStorage";
const TodoContext = createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = UseLocalStorage("TODOs", []);
  const [searchValue, setSearchValue] = useState("");
  const totalTodos = todos.length;
  const todosCompleted = todos.filter((todo) => todo.completed).length;
  const [openModal, setOpenModal] = useState(false);

  let searchedTodos =
    !searchValue.length > 0
      ? todos
      : todos.filter((todo) =>
          todo.text.toLowerCase().includes(searchValue.toLowerCase())
        );

  const onToggleCompleteTodo = (text) => {
    const index = todos.findIndex((x) => x.text === text);
    todos[index].completed = !todos[index].completed;
    saveTodos([...todos]);
  };

  const onDeleteTodo = (text) => {
    saveTodos(todos.filter((x) => x.text !== text));
  };

  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    saveTodos([...todos, newTodo]);
  };

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        error,
        loading,
        totalTodos,
        todosCompleted,
        searchValue,
        setSearchValue,
        searchedTodos,
        todos,
        onToggleCompleteTodo,
        onDeleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}
export { TodoProvider, TodoContext };
