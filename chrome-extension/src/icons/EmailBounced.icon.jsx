import React from 'react';
import { classNames } from '../utilities';

export const EmailBouncedIcon = ({
  fill = '#5bd2ad',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" />
      <path d="M3 7l9 6l9 -6" />
      <path d="M19 16v3" />
      <path d="M19 22v.01" />
    </svg>
  );
};
