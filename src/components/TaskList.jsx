import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
function TaskList() {

    const {tasks, setTasks} = useContext(TaskContext);

    const [taskInput, setTaskInput] = useState("");

    function handleAddTask() {
        if (taskInput.trim() === "") {
          return;
       }

        setTasks([...tasks,
         {
           id: Date.now(),
           text: taskInput,
           completed: false
         }
        ]);
       setTaskInput("");
     }

    function handleCompleteTask(id) {
        setTasks(
           tasks.map((task) =>
               task.id === id ? { ...task, completed: !task.completed }
               : 
               task
              )
             );
           }

    function handleDeleteTask(id) {
           setTasks(tasks.filter((task) => task.id !== id));
          }

      const totalTasks = tasks.length;

      const completedTasks = tasks.filter(
            (task) => task.completed
          ).length;

      const pendingTasks = totalTasks - completedTasks;




  return (
    <div className="task-card">
      <h2>My Tasks</h2>
      
      <div className="task-stats">
          <p>Total Tasks: {totalTasks}</p>
          <p>Completed: {completedTasks}</p>
          <p>Pending: {pendingTasks}</p>
      </div>

      <div className="task-input">
         <input
            type="text"
            placeholder="Enter a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
       <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-items">
            {tasks.map((task) => (
                <div key={task.id}>
                  <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCompleteTask(task.id)}
                  />

               <span className={task.completed ? "completed-task" : ""}>
                 {task.text}
               </span>

            <button onClick={() => handleDeleteTask(task.id)}>
                    Delete </button>
         </div>
            ))}
      </div>

    </div>
  );
}

export default TaskList;