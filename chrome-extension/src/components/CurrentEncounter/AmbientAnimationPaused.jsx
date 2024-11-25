import React from 'react';
import Lottie from 'react-lottie';
import animationData from './ambient ai.json';

export default function AmbientAnimationPaused() {
  const isMobileView = window.innerWidth <= 1260;

  const defaultOptions = {
    loop: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const width = 120;
  const height = 100;
  return (
    <div>
      <Lottie
        isPaused={true}
        options={defaultOptions}
        height={height}
        width={width}
      />
    </div>
  );
}
