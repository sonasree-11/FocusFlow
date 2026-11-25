
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import Progress from "./components/Progress";
import History from "./components/History";
import Settings from "./components/Settings";
import { Routes, Route } from "react-router-dom";
import { TaskProvider, SettingsProvider,ThemeProvider } from "./context/TaskContext";
import Welcome from "./components/Welcome";

import "./App.css";

function App() {
  return (
     <ThemeProvider>
    <SettingsProvider>
    <TaskProvider>
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
               <div className="dashboard-content">
                   <Welcome />
                   

               <div className="dashboard-grid">
                   <Timer />
                   <TaskList />
               </div>

                <Progress />
                  </div>
              }
            />

            <Route path="/timer" element={<Timer />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </TaskProvider>
    </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
