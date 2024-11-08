import React from 'react';
import { classNames } from '../utilities';

export const InfoCircleIcon = ({
  fill = '#00d091',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames('infocircle-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {' '}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#16a878"
          strokeWidth="1.5"
        />{' '}
        <path
          d="M12 17V11"
          stroke="#16a878"
          strokeWidth="1.5"
          strokeLinecap="round"
        />{' '}
        <circle
          cx="1"
          cy="1"
          r="1"
          transform="matrix(1 0 0 -1 11 9)"
          fill="#16a878"
        />{' '}
      </g>
    </svg>
  );
};
