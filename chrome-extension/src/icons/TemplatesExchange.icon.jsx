import React from 'react';
import { classNames } from '../utilities';

export const TemplatesExchangeIcon = ({ isFilled, className, onClick }) => {
  const fill = isFilled ? '#00D091' : '#000';

  return (
    <svg
      fill="none"
      className={classNames(className)}
      onClick={onClick}
      width="16px"
      height="16px"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M24 16H29V4L44 19L29 34V24H18V13L4 28L18 44V32H23"
          stroke={fill}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  );
};
