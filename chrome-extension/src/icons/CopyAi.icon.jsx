import React, { useState } from 'react';
import { classNames } from '../utilities';
import { TickIcon } from '.';

export const CopyAi = ({ className, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTick, setShowTick] = useState(false);

  const handleCopyClick = () => {
    setShowTick(true);
    setIsHovered(false);
    setTimeout(() => {
      setShowTick(false);
    }, 2000);
    onClick ? onClick() : null;
  };

  return (
    <div className="icon-container">
      {showTick ? (
        <TickIcon />
      ) : (
        <svg
          className={classNames(
            'Copy cursor-pointer',
            className ? className : '',
            isHovered ? 'hovered' : ''
          )}
          onClick={handleCopyClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          width="17"
          height="20"
          viewBox="0 0 15 17"
          fill="none"
          stroke={isHovered ? '#808080' : 'black'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.80502 4.74002H1V15.9601H11.2851V12.2201M14.0901 1H3.80502V12.2201H14.0901V1Z"
            stroke={isHovered ? '#808080' : 'black'}
            strokeWidth="1.2"
          />
        </svg>
      )}
    </div>
  );
};
