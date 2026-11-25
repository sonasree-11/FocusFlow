import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext(null);

export const SettingsContext = createContext(null);

export const ThemeContext = createContext(null);

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
  const savedTasks = JSON.parse(localStorage.getItem("focusTasks"));

  return Array.isArray(savedTasks) ? savedTasks : [];
});
useEffect(() => {
  localStorage.setItem("focusTasks", JSON.stringify(tasks));
}, [tasks]);


return (
  <TaskContext.Provider value={{ tasks, setTasks }}>
    {children}
  </TaskContext.Provider>
);
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => ({
    focusTime: Number(localStorage.getItem("focusTime")) || 25,
    shortBreak: Number(localStorage.getItem("shortBreak")) || 5,
    longBreak: Number(localStorage.getItem("longBreak")) || 15
  }));

  useEffect(() => {
    localStorage.setItem("focusTime", settings.focusTime);
    localStorage.setItem("shortBreak", settings.shortBreak);
    localStorage.setItem("longBreak", settings.longBreak);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}