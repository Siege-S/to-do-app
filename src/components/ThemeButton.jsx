import React, { useContext } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import ThemeContext from "../context/ThemeContext";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? <IoSunnySharp /> : <IoIosMoon />}
    </button>
  );
};

export default ThemeButton;
