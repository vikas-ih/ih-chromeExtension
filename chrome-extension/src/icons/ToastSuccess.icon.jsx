import React from 'react';
import { classNames } from '../utilities';

export const ToastSuccessIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('toast-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#01D091" />
      <path
        d="M6 12.8L10 17L18 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const ToastInfoIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('toast-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#5667E9" />
      <path
        d="M6 12.8L10 17L18 8"
        stroke="white"
        strokeWidth="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
