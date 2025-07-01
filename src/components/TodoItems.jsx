import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
export default function TodoItems({
  id,
  text,
  isCompleted,
  handleRemove,
  handleToggle,
}) {
  return (
    <>
      <div className="flex justify-between items-center py-3 px-4 border-1 border-(--text-color) rounded-2xl mb-5 ">
        <div className="flex items-center">
          <input
            className="mr-2 w-4 h-4"
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleToggle(id)}
          />
          <span
            className="text-(--text-color)"
            style={
              isCompleted
                ? { textDecorationLine: "line-through" }
                : { textDecorationLine: "none" }
            }
          >
            {text}
          </span>
        </div>

        <button
          className="font-bold text-(--text-color) hover:text-red-600"
          onClick={() => handleRemove(id)}
        >
          <FaTrashAlt />
        </button>
      </div>
    </>
  );
}
