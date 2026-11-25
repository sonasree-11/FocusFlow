
import { useState } from "react";

function History() {
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("focusHistory") || "[]");
  });

  const totalSessions = history.length;

  const totalFocusTime = history.reduce(
    (total, session) => total + session.duration,
    0
  );

  function handleClearHistory() {
  const confirmClear = window.confirm(
    "Are you sure you want to clear all focus history?"
  );

  if (confirmClear) {
    setHistory([]);
    localStorage.removeItem("focusHistory");
    localStorage.removeItem("completedSessions");
  }
}

  return (
    <div className="history-card">
      <h2>Focus History</h2>

      {/* History Summary */}
      <div className="history-summary">
        <div className="summary-item">
          <h3>Total Sessions</h3>
          <p>{totalSessions}</p>
        </div>

        <div className="summary-item">
          <h3>Total Focus Time</h3>
          <p>{totalFocusTime} minutes</p>
        </div>
      </div>

      {/* Clear History Button */}
      <button onClick={handleClearHistory}>
        Clear History
      </button>

      {/* History List */}
      {history.length === 0 ? (
        <div className="empty-history">
          <span className="material-symbols-outlined">
            history
          </span>

          <h3>No Focus Sessions Yet</h3>

          <p>
            Start your first focus session and your history will appear here!
          </p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((session) => (
            <div className="history-item" key={session.id}>
              <div>
                <h3>🍅 Focus Session</h3>
                <p>{session.date}</p>
              </div>

              <span>{session.duration} minutes</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
