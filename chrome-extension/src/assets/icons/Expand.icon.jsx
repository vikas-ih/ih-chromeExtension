import React, { useState } from 'react';
import { classNames } from '../utilities';

export const ExpandIcon_Two = ({ fill, id, className, onClick }) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRotated(!isRotated);
    if (onClick) onClick();
  };

  return (
    <svg
      className={classNames('quciktext-icon', className ? className : '')}
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      style={{ transform: 'rotate(180deg)' }}
      fill={fill}
    >
      <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );
};
