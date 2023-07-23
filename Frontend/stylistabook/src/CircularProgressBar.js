import React from 'react';
import './CircularProgressBar.css'; // Import the CSS file for styling

const CircularProgressBar = ({ progress }) => {
  const radius = 49;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-wrap cursor-pointer active-progress">
      <svg className="progress-circle" width="100%" height="100%" viewBox="-1 -1 102 102">
        <circle
          r={radius}
          cx="50"
          cy="50"
          style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: offset }}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
