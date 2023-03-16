import { useContext, useState } from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

function TodoForm(props = null) {
  const { setOpenModal, addTodo, editTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState(props?.todo?.text || "");
  const isEditing = !!props?.todo?.text;
  function submitTodo(event) {
    event.preventDefault();
    debugger;
    isEditing ? editTodo(props?.todo?.text, newTodo) : addTodo(newTodo);
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
