import React from 'react';
import { classNames } from '../utilities';

export const PLGUsersIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('teams-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="42"
      height="52"
      viewBox="0 0 42 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 23.3333V12.6667C10 9.11112 12.1333 2 20.6667 2C29.2 2 31.3333 9.11112 31.3333 12.6667V23.3333M10 23.3333H2V50H39.3333V23.3333H31.3333M10 23.3333H31.3333"
        stroke="#059669"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
