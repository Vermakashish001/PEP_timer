import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from 'react';

function App() {
  const [workTime, setWorkTime] = useState(25);
  const [relaxationTime, setRelaxationTime] = useState(5);
  const [taskSecond, setTaskSecond] = useState(1500);
  const [relaxationSecond, setRelaxationSecond] = useState(300);
  const [type, setType] = useState("Work");
  const [enableReset, setEnableReset] = useState(true);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag && type === "Work") {
      if (taskSecond > 0) {
        setTimeout(() => setTaskSecond(taskSecond - 1), 1000);
      }
      if (taskSecond === 0) {
        alert('Work duration is over');
        setType("Relaxation");
        setTaskSecond(workTime * 60);
      }
    }

    if (flag && type === "Relaxation") {
      if (relaxationSecond > 0) {
        setTimeout(() => setRelaxationSecond(relaxationSecond - 1), 1000);
      }
      if (relaxationSecond === 0) {
        alert('Relaxation duration is over');
        setType("Work");
        setRelaxationSecond(relaxationTime * 60);
      }
    }
  }, [type, flag, taskSecond, relaxationTime, relaxationSecond, workTime]);

  const convertor = (sec) => {
    let m = parseInt(sec / 60).toString();
    let s = parseInt(sec % 60).toString();
    if (m.length === 1) m = "0" + m;
    if (s.length === 1) s = "0" + s;
    return m + ":" + s;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskSecond(workTime * 60);
    setRelaxationSecond(relaxationTime * 60);
    setType("Work");
  };

  const handleReset = () => {
    setEnableReset(true);
    setFlag(false);
    setRelaxationTime(5);
    setWorkTime(25);
    setTaskSecond(1500);
    setRelaxationSecond(300);
  };

  const handleInputChange = (e, setState) => {
    const inputValue = e.target.value;
    const sanitizedValue = Math.max(0, Math.floor(inputValue));
    setState(sanitizedValue);
  };

  return (
    <div>
      <div>
        <h1>{type === "Work" ? convertor(taskSecond) : convertor(relaxationSecond)}</h1>
        <h1>{type === "Work" ? "Work" : "Relaxation"}-Time</h1>
      </div>
      <div>
        <button onClick={() => { setFlag(true); setEnableReset(false); }} disabled={flag}>
          Start
        </button>
        <button onClick={() => { setFlag(false); setEnableReset(false); }} disabled={!flag}>
          Stop
        </button>
        <button onClick={handleReset} disabled={enableReset}>
          Reset
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={workTime}
            onChange={(e) => handleInputChange(e, setWorkTime)}
            disabled={flag}
          />
          <input
            type="number"
            value={relaxationTime}
            onChange={(e) => handleInputChange(e, setRelaxationTime)}
            disabled={flag}
          />
          <input type="submit" value="Set" disabled={flag} />
        </form>
      </div>
    </div>
  );
}

export default App;
