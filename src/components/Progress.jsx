import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
function Progress() {

  const { tasks } = useContext(TaskContext);

  const completedTasks = tasks.filter(
  (task) => task.completed).length;

  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercentage = totalTasks === 0
  ? 0
  : (completedTasks / totalTasks) * 100;

  let progressMessage = "";

  if (progressPercentage === 100) {
    progressMessage = "Amazing! All tasks completed!";
  } else if (progressPercentage >= 50) {
    progressMessage = "You're doing great!";
  } else {
    progressMessage = "Keep going. You've got this!";
  }

    
  return (
    <div className="progress-card">
      <h2>My Progress</h2>
      <div className="progress-stats">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>Pending: {pendingTasks}</p>
        <p>Progress: {Math.round(progressPercentage)}%</p>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"
             style={{ width: `${progressPercentage}%` }}
           ></div>
        </div>

        <p className="progress-message">
             {progressMessage} </p>
    </div>
  );
}

export default Progress;