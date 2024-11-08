import React from 'react';
import { classNames } from "../utilities";

export const MicrosoftIcon = ({ className }) => {
  return (
    <svg
      className={classNames('microsoft-icon', className ? className : '')}
      width="38"
      height="41"
      viewBox="0 0 38 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 1000002411">
        <rect
          id="Rectangle 1"
          x="1.26636"
          y="0.5"
          width="16.1914"
          height="18.7407"
          fill="#F8510C"
          stroke="white"
        />
        <rect
          id="Rectangle 3"
          x="1.26636"
          y="21.7593"
          width="16.1914"
          height="18.7407"
          fill="#00A3F4"
          stroke="white"
        />
        <rect
          id="Rectangle 2"
          x="20.4413"
          y="0.5"
          width="16.1914"
          height="18.7407"
          fill="#7EBA00"
          stroke="white"
        />
        <rect
          id="Rectangle 4"
          x="20.4413"
          y="21.7593"
          width="16.1914"
          height="18.7407"
          fill="#FFBA00"
          stroke="white"
        />
      </g>
    </svg>
  );
};
