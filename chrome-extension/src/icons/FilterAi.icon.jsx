import React from 'react';
import { classNames } from '../utilities';

export const FilterAiIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames(
        'filter-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.92977 10.5671L9.6118 15.9019C9.56044 16.7637 8.55401 17.2738 7.75 16.8456L6.875 16.3795C6.33392 16.0913 6 15.555 6 14.9741V10.3978C6 9.74858 5.74038 9.12265 5.27183 8.64225L1.65643 4.93536C1.23404 4.50229 1 3.93802 1 3.35274C1 2.05336 2.1301 1 3.52415 1L14.6447 1C15.9455 1 17 1.98288 17 3.19532C17 3.86898 16.6682 4.50534 16.0999 4.92154L10.9956 8.65973C10.3627 9.12321 9.97441 9.81811 9.92977 10.5671Z"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
};
