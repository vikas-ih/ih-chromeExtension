import React from 'react';
import Lottie from 'react-lottie';
import animationData from './ambient ai.json';

export default function AmbientAnimation() {
  const isMobileView = window.innerWidth <= 1260;

  const defaultOptions = {
    loop: true,
    autoplay: true,
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
        options={defaultOptions}
        height={height}
        width={width}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
