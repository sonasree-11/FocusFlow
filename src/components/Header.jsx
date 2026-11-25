
import { useContext } from "react";
import { ThemeContext } from "../context/TaskContext";

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleThemeToggle() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <header className="dashboard-header">

      {/* Welcome Section */}
      <div className="header-welcome">
        <h2>Hello, Focus Buddy! 👋</h2>
        <p>Stay focused and get more done today!</p>
      </div>

      {/* Header Right Section */}
      <div className="header-right">

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={handleThemeToggle}
          title="Toggle theme"
          type="button"
        >
          <span className="material-symbols-outlined">
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>

        {/* Profile */}
        <div className="header-profile">
          <span className="material-symbols-outlined">
            person
          </span>

          <span className="material-symbols-outlined">
            keyboard_arrow_down
          </span>
        </div>

      </div>

    </header>
  );
}

export default Header;
