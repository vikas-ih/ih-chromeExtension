import React from 'react';
import { classNames } from '../utilities';

export const TickIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('Tick cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7L6.33371 13L17 1"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
