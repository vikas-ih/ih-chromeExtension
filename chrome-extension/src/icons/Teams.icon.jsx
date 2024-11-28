import React from 'react';
import { classNames } from '../utilities';

export const TeamsIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames('teams-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="23"
      height="20"
      viewBox="0 0 23 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 18.9999V16.9999C21.9994 16.1136 21.7178 15.2527 21.1995 14.5522C20.6812 13.8517 19.9555 13.3515 19.1364 13.1299"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2727 19V17C16.2727 15.9391 15.8705 14.9217 15.1544 14.1716C14.4384 13.4214 13.4672 13 12.4545 13H4.81818C3.80554 13 2.83437 13.4214 2.11832 14.1716C1.40227 14.9217 1 15.9391 1 17V19"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3182 1.12988C16.1395 1.35018 16.8675 1.85058 17.3873 2.55219C17.9072 3.2538 18.1894 4.11671 18.1894 5.00488C18.1894 5.89305 17.9072 6.75596 17.3873 7.45757C16.8675 8.15918 16.1395 8.65958 15.3182 8.87988"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.63642 9C10.7451 9 12.4546 7.20914 12.4546 5C12.4546 2.79086 10.7451 1 8.63642 1C6.5277 1 4.81824 2.79086 4.81824 5C4.81824 7.20914 6.5277 9 8.63642 9Z"
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
