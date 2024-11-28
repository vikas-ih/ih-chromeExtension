import React from 'react';

export const AudioIcon = ({ micLevel }) => {
  // Calculate the number of active dots based on micLevel
  const activeDots = Math.ceil(micLevel / 20);

  // Function to generate an array of dots
  const generateDots = () => {
    const dots = [];
    for (let i = 0; i < 3; i++) {
      // Determine if the dot should be active based on its index and activeDots
      const isActive = i < activeDots && micLevel > 0; // Only activate if micLevel > 0
      dots.push(
        <div key={i} className={`dotss ${isActive ? 'active-dots' : ''}`}></div>
      );
    }
    return dots;
  };

  return (
    <div className="ml-1">
      <div className="flex items-center">{generateDots()}</div>
    </div>
  );
};
