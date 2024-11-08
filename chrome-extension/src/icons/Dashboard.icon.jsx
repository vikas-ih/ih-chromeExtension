import React from 'react';
import { classNames } from '../utilities';

export const DashboardIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames('dashboard-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 13.8333H13.8334V21.9999H22V13.8333Z"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16667 13.8333H1V21.9999H9.16667V13.8333Z"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 1H13.8334V9.16667H22V1Z"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16667 1H1V9.16667H9.16667V1Z"
        stroke="#191D23"
        strokeWidth="2"
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
