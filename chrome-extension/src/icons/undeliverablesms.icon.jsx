import React from 'react';
import { classNames } from '../utilities';

export const UndeliveredSmsIcon = ({
  fill = '#5bd2ad',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames('cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      id="UndeliveredSmsIcon"
      width="17"
      height="14"
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.9 6.4H8.1V3.2H9.9V6.4ZM9.9 8H8.1V9.6H9.9V8ZM18 1.6V11.2C18 11.6243 17.8104 12.0313 17.4728 12.3314C17.1352 12.6314 16.6774 12.8 16.2 12.8H3.6L0 16V1.6C0 1.17565 0.189642 0.768687 0.527208 0.468629C0.864773 0.168571 1.32261 0 1.8 0H16.2C16.6774 0 17.1352 0.168571 17.4728 0.468629C17.8104 0.768687 18 1.17565 18 1.6ZM16.2 1.6H1.8V12.16L2.88 11.2H16.2V1.6Z"
        fill="#807E7E"
      />
    </svg>
  );
};
