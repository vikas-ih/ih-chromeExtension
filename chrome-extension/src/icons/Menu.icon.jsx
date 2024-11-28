import React from 'react';
import { classNames } from '../utilities';

export const MenuIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames(
        'menu-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="7"
      height="25"
      viewBox="0 0 7 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.24324 0C5.03438 0 6.48649 1.45205 6.48649 3.24324C6.48649 5.03444 5.03438 6.48649 3.24324 6.48649C1.45211 6.48649 0 5.03444 0 3.24324C0 1.45205 1.45211 0 3.24324 0Z"
        fill="#00D090"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.24324 10.0901C5.03438 10.0901 6.48649 11.5422 6.48649 13.3333C6.48649 15.1245 5.03438 16.5766 3.24324 16.5766C1.45211 16.5766 0 15.1245 0 13.3333C0 11.5422 1.45211 10.0901 3.24324 10.0901Z"
        fill="#059669"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.24324 20.1801C5.03438 20.1801 6.48649 21.6322 6.48649 23.4233C6.48649 25.2144 5.03438 26.6665 3.24324 26.6665C1.45211 26.6665 0 25.2144 0 23.4233C0 21.6322 1.45211 20.1801 3.24324 20.1801Z"
        fill="#00D090"
      />
    </svg>
  );
};
