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

  const width = isMobileView ? 200 : 200;
  const height = isMobileView ? 200 : 200;
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
