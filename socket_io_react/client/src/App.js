import React, { useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const App = () => {
  useEffect(() => {
    const socket = io.connect("/");
  }, []);

  return (
    <div className="App">
      <h2>React Real Time Chat Application</h2>
    </div>
  );
};

export default App;
