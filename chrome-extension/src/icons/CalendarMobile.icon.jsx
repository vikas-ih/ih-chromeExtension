import React from 'react';
import { classNames } from '../utilities';

export const CalendarMobileIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4.10889 1V3.33167M11.8811 1V3.33167M4.18663 14.2128C4.54669 12.439 6.11493 11.1039 7.995 11.1039C9.8751 11.1039 11.4433 12.439 11.8034 14.2128M3.48711 14.99H12.5029C13.3735 14.99 13.8088 14.99 14.1413 14.8206C14.4337 14.6716 14.6716 14.4337 14.8206 14.1413C14.99 13.8088 14.99 13.3735 14.99 12.5029V5.04156C14.99 4.17098 14.99 3.7357 14.8206 3.40319C14.6716 3.11069 14.4337 2.8729 14.1413 2.72387C13.8088 2.55444 13.3735 2.55444 12.5029 2.55444H3.48711C2.61654 2.55444 2.18125 2.55444 1.84874 2.72387C1.55625 2.8729 1.31845 3.11069 1.16943 3.40319C1 3.7357 1 4.17098 1 5.04156V12.5029C1 13.3735 1 13.8088 1.16943 14.1413C1.31845 14.4337 1.55625 14.6716 1.84874 14.8206C2.18125 14.99 2.61654 14.99 3.48711 14.99ZM9.54944 7.21778C9.54944 8.0763 8.85352 8.77222 7.995 8.77222C7.13648 8.77222 6.44056 8.0763 6.44056 7.21778C6.44056 6.35928 7.13648 5.66333 7.995 5.66333C8.85352 5.66333 9.54944 6.35928 9.54944 7.21778Z"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};