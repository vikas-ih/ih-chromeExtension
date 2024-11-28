import React, { useState } from 'react';
import { classNames } from '../utilities';

export const CopiesIcon = ({
  className,
  onClick,
  width = '21',
  height = '19',
  color = '#fff',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTick, setShowTick] = useState(false);

  const handleCopyClick = () => {
    setIsHovered(false);
    setTimeout(() => {
      setShowTick(false);
    }, 2000);
    onClick ? onClick() : null;
  };

  return (
    <svg
      className={classNames(
        'Copy cursor-pointer',
        className ? className : '',
        isHovered ? 'hovered' : ''
      )}
      onClick={handleCopyClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.6665 6.40005C2.6665 4.70325 2.6665 3.85425 3.15483 3.32745C3.64261 2.80005 4.42872 2.80005 5.99982 2.80005H7.66648C9.23758 2.80005 10.0237 2.80005 10.5115 3.32745C10.9998 3.85425 10.9998 4.70325 10.9998 6.40005V9.40004C10.9998 11.0968 10.9998 11.9458 10.5115 12.4726C10.0237 13 9.23758 13 7.66648 13H5.99982C4.42872 13 3.64261 13 3.15483 12.4726C2.6665 11.9458 2.6665 11.0968 2.6665 9.40004V6.40005Z"
        stroke={color}
      />
      <path
        d="M2.66666 11.2C2.22463 11.2 1.80071 11.0104 1.48815 10.6728C1.17559 10.3352 1 9.87738 1 9.39999V5.8C1 3.5374 1 2.4058 1.65111 1.7032C2.30166 1 3.34943 1 5.44442 1H7.66663C8.10866 1 8.53258 1.18964 8.84514 1.52721C9.15769 1.86477 9.33329 2.32261 9.33329 2.8"
        stroke={color}
      />
    </svg>
  );
};
