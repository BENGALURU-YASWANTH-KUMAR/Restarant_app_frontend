// src/components/Loader.jsx
import React, { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="position-fixed top-0 start-0 w-100"
      style={{ zIndex: 9999, height: "3px" }}
    >
      <div
        className="h-100 bg-danger"
        style={{
          width: `${progress}%`,
          transition: "width 0.3s ease",
          background: "linear-gradient(90deg, #ff0000, #ff4444)",
          boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
        }}
      ></div>
    </div>
  );
};

export default Loader;
