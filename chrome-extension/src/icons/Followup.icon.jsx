import React from 'react';
import { classNames } from '../utilities';

export const FollowUpIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames(
        'alert-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="13" height="15" rx="8" />
      <path
        d="M1 8.53332C1 11.5525 3.46243 14 6.5 14C9.53758 14 12 11.5525 12 8.53332C12 5.51416 9.53758 3.06665 6.5 3.06665C5.42798 3.06665 4.42764 3.37148 3.58186 3.89869"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.57069 1L3.35556 3.73592C3.19979 4.08664 3.35956 4.49648 3.71244 4.65131L6.46506 5.85907"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};
