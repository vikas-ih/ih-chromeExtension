import React from 'react';
import { classNames } from '../utilities';

export const Stop = ({ fill = '#000000', className, onClick }) => {
  return (
    <svg
      className={classNames('stop-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="44" height="44" rx="22" fill="#F01248" />
      <rect
        x="2"
        y="2"
        width="41"
        height="41"
        rx="20.5"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="3"
      />
      <path
        d="M28.5 14H16.5V26H28.5V14Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="50%"
        y="75%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="bold"
        fontFamily="poppins"
      >
        STOP
      </text>
    </svg>
  );
};

export default Stop;
