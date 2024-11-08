import React from 'react';
import { classNames } from '../utilities';

export const OpenedSmsIcon = ({ fill = '#5bd2ad', id, className, onClick }) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2 0H1.8C0.81 0 0 0.72 0 1.6V16L3.6 12.8H16.2C17.19 12.8 18 12.08 18 11.2V1.6C18 0.72 17.19 0 16.2 0ZM16.2 11.2H2.88L1.8 12.16V1.6H16.2V11.2ZM7.623 9.6L4.5 6.8L5.76 5.672L7.623 7.336L12.24 3.2L13.5 4.328L7.623 9.6Z"
        fill="#7E84CF"
      />
    </svg>
  );
};
