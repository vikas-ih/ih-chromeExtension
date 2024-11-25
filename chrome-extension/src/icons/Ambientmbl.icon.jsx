import React from 'react';
import { classNames } from '../utilities';

export const AmbientMblIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('quciktext-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="20"
      height="20"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 11.0833C8.93083 11.0833 10.5 9.51413 10.5 7.58329V4.66663C10.5 2.73579 8.93083 1.16663 7 1.16663C5.06917 1.16663 3.5 2.73579 3.5 4.66663V7.58329C3.5 9.51413 5.06917 11.0833 7 11.0833Z"
        stroke="black"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.75 6.41663V7.58329C1.75 10.4825 4.10083 12.8333 7 12.8333C9.89917 12.8333 12.25 10.4825 12.25 7.58329V6.41663"
        stroke="black"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.31416 4.36348C6.3525 3.98431 7.48416 3.98431 8.5225 4.36348"
        stroke="black"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.85083 6.11325C6.55083 5.92075 7.29166 5.92075 7.99166 6.11325"
        stroke="black"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
