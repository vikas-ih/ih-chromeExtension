import React, { useState } from 'react';
import { classNames } from '../utilities';
import { DoubleTick } from './DoubleTick.icon';

export const UpdateIcon = ({ className, onClick }) => {
  return (
    <div className="icon-container">
      <svg
        className={classNames(
          'Copy cursor-pointer',
          className ? className : ''
        )}
        onClick={onClick ? onClick : () => null}
        stroke={'#ffffff'}
        width="14"
        height="14"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7L6.33371 13L17 1"
          stroke={'#ffffff'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
