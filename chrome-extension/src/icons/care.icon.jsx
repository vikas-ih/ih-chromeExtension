import React from 'react';
import { classNames } from '../utilities';

export const CareIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames('care-plan-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="35"
      height="35"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3333 3.33334H9.99996C9.1159 3.33334 8.26806 3.68453 7.64294 4.30965C7.01782 4.93478 6.66663 5.78262 6.66663 6.66668V33.3333C6.66663 34.2174 7.01782 35.0652 7.64294 35.6904C8.26806 36.3155 9.1159 36.6667 9.99996 36.6667H30C30.884 36.6667 31.7319 36.3155 32.357 35.6904C32.9821 35.0652 33.3333 34.2174 33.3333 33.3333V13.3333L23.3333 3.33334Z"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.6667 28.3333H13.3334"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.6667 21.6667H13.3334"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 15H15H13.3334"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3333 3.33334V13.3333H33.3333"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={`paint0_linear_3_908${id}`}
          x1="34.2807"
          y1="37.1105"
          x2="11.5217"
          y2="13.3103"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#059669" />
          <stop offset="0.78125" stopColor="#00D090" />
        </linearGradient>
      </defs>
    </svg>
  );
};
