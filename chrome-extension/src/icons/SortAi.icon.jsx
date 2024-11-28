import React from 'react';
import { classNames } from '../utilities';

export const SortAi = ({ fill = '#000000', className, onClick }) => {
  return (
    <svg
      className={classNames('cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 9L3.75 10.5L2.25 9"
        stroke="#667085"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.75 1.5V10.5"
        stroke="#667085"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.75 3L8.25 1.5L9.75 3"
        stroke="#667085"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.25 10.5V1.5"
        stroke="#667085"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
