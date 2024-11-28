import React from 'react';
import { classNames } from '../utilities';

export const BigMicIcon = ({
  fill = '#00d091', // Red color
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames('Bigmic-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="80"
      height="80"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.0332 15.5757C23.0332 12.4963 25.4575 10 28.448 10C31.4385 10 33.8628 12.4963 33.8628 15.5757V25.3333C33.8628 28.4126 31.4385 30.909 28.448 30.909C25.4575 30.909 23.0332 28.4126 23.0332 25.3333V15.5757Z"
        fill={`url(#filter0_d_191_578${id})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.6643 25.1155V25.3332C20.6643 27.459 21.4844 29.4976 22.9441 31.0008C24.4038 32.5039 26.3837 33.3483 28.4481 33.3483C30.5125 33.3483 32.4922 32.5039 33.9521 31.0008C35.4118 29.4976 36.2318 27.459 36.2318 25.3332V25.1155C36.2318 24.3456 36.8379 23.7216 37.5855 23.7216H38.2624C39.01 23.7216 39.6161 24.3456 39.6161 25.1154V25.3332C39.6161 28.3832 38.4395 31.3083 36.345 33.4649C34.6537 35.2066 32.4757 36.3318 30.1402 36.7005V39.2726C30.1402 40.0424 29.5341 40.6665 28.7865 40.6665H28.1096C27.362 40.6665 26.7559 40.0424 26.7559 39.2726V36.7005C24.4204 36.3318 22.2424 35.2066 20.5511 33.4649C18.4567 31.3083 17.28 28.3832 17.28 25.3332V25.1155C17.28 24.3456 17.8861 23.7216 18.6337 23.7216H19.3106C20.0582 23.7216 20.6643 24.3456 20.6643 25.1155Z"
        fill={`url(#filter0_d_191_578${id})`}
      />
      <defs>
        <linearGradient
          id={`filter0_d_191_578${id}`}
          x1="34.2807"
          y1="37.1105"
          x2="11.5217"
          y2="13.3103"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00d091" />
          <stop offset="0.78125" stopColor="#00d091" />
        </linearGradient>
      </defs>
    </svg>
  );
};
