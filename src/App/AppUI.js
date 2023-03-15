import React, { useContext } from "react";
import { TodoCounter } from "../components/TodoCounter/index";
import { TodoSearch } from "../components/TodoSearch/index";
import { TodoList } from "../components/TodoList/index";
import { TodoItem } from "../components/TodoItem/index";
import { CreateTodoButton } from "../components/CreateTodoButton/index";
import { TodoContext } from "../components/TodoContext";
import { Modal } from "../components/Modal";
import { TodoForm } from "../components/TodoForm";
import { ThreeDots as CustomLoader } from "../components/CustomLoader";

function AppUI() {
  const {
    loading,
    error,
    onToggleCompleteTodo,
    onDeleteTodo,
    searchedTodos,
    openModal,
    setOpenModal,
  } = useContext(TodoContext);

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {loading && (
          <Modal>
            <CustomLoader />
          </Modal>
        )}
        {error && <p>Algo ha salido mal</p>}
        {!loading && !searchedTodos.length && <p>No hay TODOS</p>}
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            completed={todo.completed}
            text={todo.text}
            onComplete={() => onToggleCompleteTodo(todo.text)}
            onDelete={() => onDeleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton setOpenModal={setOpenModal} />
      {!!openModal && (
        <Modal color="">
          <TodoForm />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { AppUI };
