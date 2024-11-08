import React from 'react';
import { classNames } from '../utilities';

export const ChatIcon = ({ fill = '#5bd2ad', id, className, onClick }) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="#EEFAF4" />
      <path
        d="M15 15.1111V14.6667M18.2 15.1111V14.6667M11.8 15.1111V14.6667M8.1712 20.2916C7 19.2507 7 18.4631 7 15.1111C7 11.7591 7 10.0827 8.1712 9.04178C9.344 8 11.2288 8 15 8C18.7712 8 20.6568 8 21.828 9.04178C23 10.0827 23 11.7591 23 15.1111C23 18.4631 23 19.2507 21.828 20.2916C20.6576 21.3333 18.7712 21.3333 15 21.3333C12.992 21.3333 11.96 22.8782 10.2 24V21.1449C9.3248 21 8.6808 20.7449 8.1712 20.2916Z"
        stroke="#41AD8C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
