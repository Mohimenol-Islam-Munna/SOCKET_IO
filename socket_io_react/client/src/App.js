import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const socket = io.connect("/");

    // title
    socket.on("title", (data) => {
      setTitle(data);
    });

    // time
    socket.on("time", (data) => {
      setTime(data);
    });
  }, []);

  return (
    <div className="App">
      <h2>Title : {title}</h2>
      <p>Time : {time}</p>
    </div>
  );
};

export default App;
