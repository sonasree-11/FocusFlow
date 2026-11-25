
import { useState, useContext } from "react";
import { SettingsContext } from "../context/TaskContext";

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);

  const [focusTime, setFocusTime] = useState(settings.focusTime);
  const [shortBreak, setShortBreak] = useState(settings.shortBreak);
  const [longBreak, setLongBreak] = useState(settings.longBreak);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSettings({
      focusTime,
      shortBreak,
      longBreak
    });

    setSaved(true);
  }

  function handleReset() {
    setFocusTime(25);
    setShortBreak(5);
    setLongBreak(15);

    setSettings({
      focusTime: 25,
      shortBreak: 5,
      longBreak: 15
    });

    setSaved(false);
  }

  return (
    <div className="settings-card">
      <h2>Settings</h2>
      <p className="settings-description">
        Customize your focus sessions and break durations.
      </p>

      <div className="setting-item">
        <label>Focus Duration (minutes)</label>
        <input
          type="number"
          min="1"
          max="120"
          value={focusTime}
          onChange={(e) => {
            setFocusTime(Number(e.target.value));
            setSaved(false);
          }}
        />
      </div>

      <div className="setting-item">
        <label>Short Break (minutes)</label>
        <input
          type="number"
          min="1"
          max="60"
          value={shortBreak}
          onChange={(e) => {
            setShortBreak(Number(e.target.value));
            setSaved(false);
          }}
        />
      </div>

      <div className="setting-item">
        <label>Long Break (minutes)</label>
        <input
          type="number"
          min="1"
          max="60"
          value={longBreak}
          onChange={(e) => {
            setLongBreak(Number(e.target.value));
            setSaved(false);
          }}
        />
      </div>

      <div className="settings-buttons">
        <button onClick={handleSave}>Save Settings</button>
        <button onClick={handleReset}>Reset Defaults</button>
      </div>

      {saved && (
        <p className="settings-success">
          Settings saved successfully!
        </p>
      )}
    </div>
  );
}

export default Settings;
