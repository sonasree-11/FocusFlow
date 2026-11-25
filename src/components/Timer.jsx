import { useEffect, useState, useRef, useContext } from "react";
import { SettingsContext } from "../context/TaskContext";

function Timer(){

    const { settings } = useContext(SettingsContext);

    const[timeLeft,setTimeLeft]=useState(settings.focusTime * 60);
    const[isRunning,setIsRunning]=useState(false);

    const audioContextRef = useRef(null);

    const minutes= Math.floor(timeLeft/60);
    const seconds= timeLeft%60;
    const formattedTime =
  `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const[mode,setMode]=useState("Focus");

    const durations = {
      Focus: settings.focusTime * 60,
      "Short Break": settings.shortBreak * 60,
      "Long Break": settings.longBreak * 60
     };

    const totalTime = durations[mode];

    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    const [isCompleted, setIsCompleted] = useState(false);

    const [completedSessions, setCompletedSessions] = useState(() => {
        return Number(localStorage.getItem("completedSessions")) || 0;
    });

  useEffect(()=>{
    let timer;
    if(isRunning && timeLeft > 0){
        timer = setInterval(()=>{
            setTimeLeft((prevTime)=>prevTime-1);
        },1000);
    }
    if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);

    if (mode === "Focus") {
       setCompletedSessions((prev) => prev + 1);

    const savedHistory = JSON.parse(
        localStorage.getItem("focusHistory") || "[]"
    );

    const newSession = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        duration: settings.focusTime
    };

    localStorage.setItem(
        "focusHistory",
        JSON.stringify([...savedHistory, newSession])
      );
    }
   }
    return ()=> clearInterval(timer);
       },[isRunning,timeLeft]);

  useEffect(() => {
  if (isRunning && timeLeft <= 5 && timeLeft > 0) {
    playBeep();
  }
}, [timeLeft, isRunning]);

  useEffect(() => {
  localStorage.setItem("completedSessions", completedSessions);
  }, [completedSessions]);

  function handleReset(){
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(durations[mode]);
  }
  function playBeep() {
  if (!audioContextRef.current) {
    audioContextRef.current = new window.AudioContext();
  }

  const audioContext = audioContextRef.current;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  gainNode.gain.value = 0.2;

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
}

function handleStartPause() {
  if (!audioContextRef.current) {
    audioContextRef.current = new window.AudioContext();
  }

  audioContextRef.current.resume();
  setIsRunning(!isRunning);
}
    return(

        <div className="timer-card">
            {/*timer heading*/}
            <div className="timer-heading">
                <span>Pomodoro Timer</span>
            </div>
            <p className="session-count">
  Completed Focus Sessions: {completedSessions}
</p>
   
   {/* Timer Modes */}
<div className="timer-modes">
  <button className={mode==="Focus"?"active-mode":""}onClick={() => {
    setMode("Focus");
    setIsRunning(false);
    setTimeLeft(durations.Focus);
  }}>
    Focus
  </button>

  <button className={mode === "Short Break" ? "active-mode" : ""}onClick={() => {
    setMode("Short Break");
    setIsRunning(false);
    setTimeLeft(durations["Short Break"]);
  }}>
    Short Break
  </button>

  <button className={mode === "Long Break" ? "active-mode" : ""}onClick={() => {
    setMode("Long Break");
    setIsRunning(false);
    setTimeLeft(durations["Long Break"]);
  }}>
    Long Break
  </button>
</div>
          
 

            {/*timer content*/}
            <div className="timer-content">
                 {/* Study Illustration */}
                <div className="timer-illustration">

                 </div>

                  {/* Circular Timer */}
                <div className="timer-display">
               <div  className={`timer-circle ${isRunning ? "running" : ""}`}
  style={{ "--progress": `${progress}%` }}>

              <span className="timer-emoji">🍅</span>
             <h1>{formattedTime}</h1>
             <p>{mode} Time</p>
          </div>
        </div>
        {isCompleted && (
  <p className="completion-message">
    🎉 Session Completed! Great work!
  </p>
)}
                
            </div>
        {/* Timer Buttons */}
      <div className="timer-buttons">
        <button onClick={handleStartPause}>{isRunning ? "Ⅱ Pause" : "▶ Start"}</button>
        
        <button onClick={handleReset}>↻ Reset</button>
      </div>

        </div>
    );
}
export default Timer;