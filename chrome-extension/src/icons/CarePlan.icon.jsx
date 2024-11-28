import React from 'react';
import { classNames } from '../utilities';

export const CarePlanIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames(
        'care-plan-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id=".Icon">
        <path
          id="Vector"
          d="M23.3333 3.33334H9.99996C9.1159 3.33334 8.26806 3.68453 7.64294 4.30965C7.01782 4.93478 6.66663 5.78262 6.66663 6.66668V33.3333C6.66663 34.2174 7.01782 35.0652 7.64294 35.6904C8.26806 36.3155 9.1159 36.6667 9.99996 36.6667H30C30.884 36.6667 31.7319 36.3155 32.357 35.6904C32.9821 35.0652 33.3333 34.2174 33.3333 33.3333V13.3333L23.3333 3.33334Z"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M26.6667 28.3333H13.3334"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M26.6667 21.6667H13.3334"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M16.6667 15H15H13.3334"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_5"
          d="M23.3333 3.33334V13.3333H33.3333"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
