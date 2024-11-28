import React from 'react';
import { classNames } from '../utilities';

export const CloseAiIcon = ({
  className,
  onClick,
  dataindex,
  fill,
  stroke,
}) => {
  return (
    <svg
      className={classNames(
        'closeAi-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      dataindex={dataindex}
      width="14"
      height="14"
      viewBox="0 0 50 50"
      fill={fill}
      stroke={stroke}
      strokeWidth="5"
    >
      <path
        style={{ pointerEvents: 'none' }}
        d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
        stroke={stroke}
      />
    </svg>
  );
};
