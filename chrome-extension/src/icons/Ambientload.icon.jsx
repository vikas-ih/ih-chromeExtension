import React from 'react';
import { classNames } from '../utilities';

export const AmbientloadIcon = ({
  fill = '#516F90',
  id,
  className,
  onClick,
  height = '15',
  width = '15',
}) => {
  return (
    <svg
      className={classNames(
        'load-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width={width}
      height={height}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00273 12.5556H1.55704V17M9.55928 5.44444H14.005V1M1.18628 6.33636C1.6848 5.10281 2.51948 4.03381 3.59543 3.25087C4.67139 2.46792 5.94659 2.00224 7.27402 1.90712C8.60142 1.812 9.92801 2.09102 11.1047 2.71254C12.2814 3.33406 13.2592 4.27337 13.9286 5.42322M14.3763 11.6641C13.8777 12.8976 13.043 13.9666 11.9671 14.7495C10.8911 15.5325 9.61726 15.9976 8.28986 16.0927C6.96247 16.1878 5.63468 15.9089 4.45803 15.2873C3.28137 14.6658 2.30287 13.7267 1.63345 12.5768"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
