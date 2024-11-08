import React from 'react';
import { classNames } from '../utilities';

export const DropdownIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames(
        'Dropdown-icon cursor-pointer',
        className ? className : ''
      )}
      id="DropdownTopNavbar"
      onClick={onClick ? onClick : () => null}
      width="29"
      height="27"
      viewBox="0 0 29 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 1000002406">
        <g id="Rectangle 7806" filter="url(#filter0_d_191_769)">
          <rect x="4" y="2" width="21" height="19" rx="4" />
        </g>
        <path
          id="Vector"
          d="M10 9L15 14L20 9"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_191_769"
          x="0"
          y="0"
          width="29"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_191_769"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_191_769"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
