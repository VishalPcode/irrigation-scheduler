import React, { useState, useEffect } from "react";

function Clock24() {
  const [time, setTime] = useState(getCurrentTime());

  function getCurrentTime() {
    const now = new Date();
    // Format hours, minutes, seconds with leading zeros
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timerId); 
  }, []);

  return <div style={{ fontFamily: "monospace", fontSize: "2rem" }}>{time}</div>;
}

export default Clock24;
