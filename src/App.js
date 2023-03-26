import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [startTime, setStartTime] = useState(null);
  const [delta, setDelta] = useState(0);
  const [savedDelta, setSavedDelta] = useState(0);

  const timeRef = useRef();

  useEffect(() => {
    if (startTime) {
      timeRef.current = setInterval(() => {
        setDelta(savedDelta + Date.now() - startTime)
      }, 10)
    }
    return () => clearInterval(timeRef.current)
  })

  function handleToggle() {
    if (startTime) {
      setStartTime(null)
      setSavedDelta(delta)
    } else {
      setStartTime(Date.now())
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="display">
          {(Math.floor(delta / 3600000)).toString().padStart(2, '0')}
          :{(Math.floor(delta / 60000) % 60).toString().padStart(2, '0')}
          :{(Math.floor(delta / 1000) % 60).toString().padStart(2, '0')}
          .{(delta % 1000).toString().padStart(3, '0')}
        </div>
        <div className="buttons">
          <button
            className="button"
            onClick={() => { setDelta(0); setStartTime(null); setSavedDelta(0) }}
          >
            reset
          </button>
          <button
            className="button"
            style={{ backgroundColor: startTime ? "#CB4341" : "#59BE65" }}
            onClick={() => handleToggle() }
          >
            { startTime ? "stop" : "start" }
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
