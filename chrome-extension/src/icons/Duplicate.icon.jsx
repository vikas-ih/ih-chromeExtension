import React from 'react';
import { classNames } from '../utilities';

export const DuplicateIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames(
        'Duplicate cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.80502 4.74002H1V15.9601H11.2851V12.2201M14.0901 1H3.80502V12.2201H14.0901V1Z"
        stroke="#3D3D3D"
        strokeWidth="1.5"
      />
    </svg>
  );
};
