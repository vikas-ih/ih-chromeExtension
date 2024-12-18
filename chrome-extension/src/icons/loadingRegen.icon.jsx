import React from 'react';
import { classNames } from '../utilities';

export const RegenIcon = ({
  className,
  onClick,
  height = '18',
  width = '16',
}) => {
  return (
    <svg
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.0"
      width={width}
      height={height}
      viewBox="0 0 128 128"
      xml:space="preserve"
    >
      <g transform="translate(128,128) scale(-1,-1)">
        <path
          d="M62.77 23.65v7.95L90.2 16.1 62.37.2l.4 8.35s-29.52 1.54-46.1 27.43c-18.98 29.6.4 58.03.4 58.03S2.74 63 24.2 39.97c18.4-19.75 38.57-16.3 38.57-16.3zm2.03 80.9V96.6l-27.44 15.5L65.2 128l-.4-8.35s29.53-1.54 46.13-27.43c18.98-29.6-.4-58.03-.4-58.03s14.3 31-7.16 54.04c-18.4 19.75-38.57 16.3-38.57 16.3z"
          fill="#ffffff"
          fill-opacity="1"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="180 64 64"
          dur="540ms"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  );
};
