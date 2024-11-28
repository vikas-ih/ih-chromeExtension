import React from 'react';
import { classNames } from '../utilities';

export const FailedEmailNotificationIcon = ({
  fill = '#5bd2ad',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="17"
      height="18"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 7V1H8.5H1V7V13H8.5"
        stroke="#FC0202"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 9.80005L11.5 13"
        stroke="#FC0202"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 9.80005L14.5 13"
        stroke="#FC0202"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L8.5 7L16 1"
        stroke="#FC0202"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
