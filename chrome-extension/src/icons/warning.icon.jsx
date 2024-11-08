import React from 'react';
import { classNames } from '../utilities';

export const WarningIcon = ({ fill = '#5bd2ad', id, className, onClick }) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      id="WarningIcon"
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14.5" cy="14.5" r="14.5" fill="#DBFFBC" />
      <circle cx="14.5" cy="14.5" r="14.5" fill="#FFE0E0" />
      <path
        d="M6 22L14.5 7L23 22H6ZM8.1677 20.7143H20.8323L14.5 9.57138L8.1677 20.7143ZM14.5 19.6923C14.6919 19.6923 14.8528 19.626 14.9827 19.4933C15.1125 19.3606 15.1774 19.1962 15.1774 19C15.1774 18.8038 15.1125 18.6394 14.9827 18.5067C14.8528 18.3741 14.6919 18.3077 14.5 18.3077C14.3081 18.3077 14.1472 18.3741 14.0173 18.5067C13.8875 18.6394 13.8226 18.8038 13.8226 19C13.8226 19.1962 13.8875 19.3606 14.0173 19.4933C14.1472 19.626 14.3081 19.6923 14.5 19.6923ZM13.871 17.4506H15.129V13.1648H13.871V17.4506Z"
        fill="#FC0202"
      />
    </svg>
  );
};
