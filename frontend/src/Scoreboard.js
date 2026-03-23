import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Scoreboard() {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);

  useEffect(() => {
    socket.on("liveScore", (data) => {
      setRuns(data.runs);
      setWickets(data.wickets);
    });
  }, []);

  const updateScore = (newRuns, newWickets) => {
    socket.emit("scoreUpdate", {
      runs: newRuns,
      wickets: newWickets
    });
  };

  return (
    <div>
      <h2>{runs}/{wickets}</h2>

      <button onClick={() => {
        setRuns(runs + 1);
        updateScore(runs + 1, wickets);
      }}>+1</button>

      <button onClick={() => {
        setRuns(runs + 4);
        updateScore(runs + 4, wickets);
      }}>+4</button>

      <button onClick={() => {
        setRuns(runs + 6);
        updateScore(runs + 6, wickets);
      }}>+6</button>

      <button onClick={() => {
        setWickets(wickets + 1);
        updateScore(runs, wickets + 1);
      }}>Wicket</button>
    </div>
  );
}

export default Scoreboard;
