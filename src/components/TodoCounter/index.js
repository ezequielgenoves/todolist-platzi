import { useContext } from "react";
import { TodoContext } from "../TodoContext";
import "./TodoCounter.css";

const TodoCounter = () => {
  const { todosCompleted: completed, totalTodos: total } = useContext(TodoContext);

  return (
    <h2 className="TodoCounter">
      Has completado {completed} de {total} TODOs
    </h2>
  );
};
export { TodoCounter };
