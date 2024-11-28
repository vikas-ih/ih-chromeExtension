import React from 'react';
import { classNames } from '../utilities';

export const ExpandIcon = ({ className, onClick, fill }) => {
  return (
    <svg
      className={classNames(
        'add-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      id="expand_icon"
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65383 6.70762L0 1.05383L1.05383 0L5.65383 4.6L10.2538 0L11.3077 1.05383L5.65383 6.70762Z"
        fill={fill}
      />
    </svg>
  );
};
