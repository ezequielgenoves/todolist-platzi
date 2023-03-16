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
  const todosCompleted = todos?.filter((todo) => todo.completed).length;
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  let searchedTodos =
    !searchValue.length > 0
      ? todos
      : todos.filter((todo) =>
          todo.text.toLowerCase().includes(searchValue.toLowerCase())
        );

  const onToggleCompleteTodo = (text) => {
    const index = todos.findIndex((x) => x.text === text);
    todos[index].completed = !todos[index].completed;
    orderAndSave([...todos]);
  };

  const onDeleteTodo = (text) => {
    orderAndSave(todos.filter((x) => x.text !== text));
  };

  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    orderAndSave([...todos, newTodo]);
  };

  const editTodo = (textBefore, text) => {
    const index = todos.findIndex((x) => x.text === textBefore);
    todos[index] = { text, completed: false };
    orderAndSave([...todos]);
  };

  const orderAndSave = (todos) => {
    todos.sort((x, y) => {
      return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
    });
    saveTodos(todos);
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
        todoToEdit,
        setTodoToEdit,
        editTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}
export { TodoProvider, TodoContext };
