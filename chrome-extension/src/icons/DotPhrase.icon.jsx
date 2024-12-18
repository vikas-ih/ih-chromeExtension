import React from 'react';
import { classNames } from '../utilities';

export const DotPhraseIcon = ({ className, onClick }) => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style>
            {`
                        .cls-1 {
                            fill: none;
                            stroke: #ff6f00;
                            stroke-miterlimit: 10;
                            stroke-width: 1.91px;
                        }
                    `}
          </style>
        </defs>
        <polyline
          className="cls-1"
          points="15.82 2.46 15.82 2.46 20.59 2.46 20.59 22.5 3.41 22.5 3.41 2.46 8.18 2.46 8.18 2.46"
        ></polyline>
        <path
          className="cls-1"
          d="M15.82,1.5V3.41a1.92,1.92,0,0,1-1.91,1.91H10.09A1.92,1.92,0,0,1,8.18,3.41V1.5Z"
        ></path>
        <line
          className="cls-1"
          x1="11.05"
          y1="12.95"
          x2="12.95"
          y2="12.95"
        ></line>
        <line
          className="cls-1"
          x1="14.86"
          y1="12.95"
          x2="16.77"
          y2="12.95"
        ></line>
        <line
          className="cls-1"
          x1="7.23"
          y1="12.95"
          x2="9.14"
          y2="12.95"
        ></line>
      </g>
    </svg>
  );
};
