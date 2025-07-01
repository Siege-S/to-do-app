import Todo from "./components/todo";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Todo />
      </ThemeProvider>
    </>
  );
};

export default App;
