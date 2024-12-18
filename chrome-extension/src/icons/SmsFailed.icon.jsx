import React from 'react';
import { classNames } from '../utilities';

export const SmsFailedIcon = ({ fill = '#5bd2ad', id, className, onClick }) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      fill="#FC0202"
      viewBox="0 0 32 32"
      width="24px"
      height="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24,4H8C5.2,4,3,6.2,3,9v19c0,0.4,0.2,0.7,0.6,0.9C3.7,29,3.9,29,4,29c0.2,0,0.5-0.1,0.7-0.2C9,25,14.5,23,20.2,23H24
            c2.8,0,5-2.2,5-5V9C29,6.2,26.8,4,24,4z M19.5,16.1c0.4,0.4,0.4,1,0,1.4c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3L16,15.4
            l-2.1,2.1c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.1-2.1l-2.1-2.1c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0
            l2.1,2.1l2.1-2.1c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L17.4,14L19.5,16.1z"
      />
    </svg>
  );
};
