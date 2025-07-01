import { useContext, useEffect, useRef, useState } from "react";
import TodoItems from "./TodoItems";
import { GrNotes } from "react-icons/gr";
import ThemeButton from "./ThemeButton";

export default function Todo() {
  // Store todos in localstorage for persistent data
  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem("myTodos") || "[]")
  );
  const inputRef = useRef();
  const [remainingCount, setRemainingCount] = useState(0);
  const [inputEmptyError, setInputEmptyError] = useState("");

  useEffect(() => {
    //Save to localstorage
    localStorage.setItem("myTodos", JSON.stringify(todos));

    // Count Remaining Task
    const count = todos.filter((todo) => !todo.isCompleted).length;
    setRemainingCount(count);
    // console.log("count: " + remainingCount);

    // Sort Todos completed/not completed
    const sortedTodos = todos.sort((a, b) => a.isCompleted - b.isCompleted);
    setTodos(sortedTodos);
  }, [todos]);

  // Add Task
  const handleAdd = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) {
      setInputEmptyError("*Please add a new task");
      return;
    }
    // console.log(inputText);
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    };

    setTodos((prevState) => [...prevState, newTodo]);
    inputRef.current.value = "";
    inputRef.current.focus();
    setInputEmptyError("");
  };

  // Remove Task
  const handleRemove = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    // console.log("Removing:", id);
    setTodos(filteredTodos);
  };

  // Toggle Task {line-through} {!isCompleted}
  const handleToggle = (id) => {
    const toggledTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodos(toggledTodos);
  };
  // console.log(todos);

  const enterKey = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };
  return (
    <>
      <div className="flex bg-(--page-bg-color) justify-center items-center min-h-screen p-[16px]">
        <div className="flex flex-col w-full sm:w-[500px]">
          <div className="flex justify-between items-center mb-5 w-full font-poppins font-extrabold text-(--text-color) text-[48px]">
            <h1 className="flex items-center">
              <GrNotes className="mr-3" />
              To Do List
            </h1>
            <ThemeButton />
          </div>

          <div className="flex flex-col w-full mb-8">
            <p className="text-red-500">{inputEmptyError}</p>

            <div className="flex w-full">
              <input
                className="h-10 border-b-3 border-(--text-color) flex-1 mr-3 text-(--text-color)"
                ref={inputRef}
                onKeyDown={enterKey}
                type="text"
                placeholder="  Add new task"
              />
              <button
                className="bg-(--text-color) hover:bg-green-600 text-(--page-bg-color) font-bold py-2 px-4 rounded"
                onClick={handleAdd}
              >
                +
              </button>
            </div>
          </div>
          {todos.map((todo) => (
            <TodoItems
              key={todo.id}
              id={todo.id}
              text={todo.text}
              isCompleted={todo.isCompleted}
              handleRemove={handleRemove}
              handleToggle={handleToggle}
            />
          ))}
          <div>
            {remainingCount !== 0 && (
              <span className="text-[20px] font-semibold text-(--text-color)">
                Remaining Todos: {remainingCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
