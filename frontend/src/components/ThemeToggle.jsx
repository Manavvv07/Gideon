import { useEffect } from "react";
import useDarkMode from "../Hooks/UseDarkMode";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ThemeToggle = ({ className = "", onThemeChange }) => {
  const [theme, toggle] = useDarkMode();
  const isDark = theme === "dark";

  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  return (
    <button
      className={`theme-toggle-btn ${className}`}
      onClick={toggle}
      aria-label="Toggle theme"
      type="button"
    >
      {isDark ? (
        <FaMoon className="theme-icon" />
      ) : (
        <IoSunny className="theme-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
