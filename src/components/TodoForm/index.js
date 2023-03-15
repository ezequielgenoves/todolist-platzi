import { useContext, useState } from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

function TodoForm() {
  const { setOpenModal, addTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");
  function submitTodo(event) {
    event.preventDefault();
    addTodo(newTodo);
    closeModal();
  }
  function closeModal() {
    setOpenModal(false);
  }
  function onTextChange(event) {
    setNewTodo(event.target.value);
  }
  return (
    <form onSubmit={submitTodo}>
      <label>Añada un TODO</label>
      <textarea
        value={newTodo}
        onChange={onTextChange}
        placeholder="Cortar la cebolla para el almuerzo"
      />
      <div className="TodoForm-buttonContainer">
        <button
          className="TodoForm-button TodoForm-button-cancel"
          type="button"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button className="TodoForm-button TodoForm-button-add" type="submit">
          Añadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
