import React from 'react';
import { classNames } from '../utilities';

export const EmailSentIcon = ({
  stroke = '#5bd2ad',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8BCB53"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
      <path d="M3 6l9 6l9 -6" />
      <path d="M15 18h6" />
      <path d="M18 15l3 3l-3 3" />
    </svg>
  );
};
