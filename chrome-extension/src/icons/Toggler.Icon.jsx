import React from 'react';
import { classNames } from '../utilities';

export const TogglerIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames('toggler-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="30"
      height="30"
      viewBox="0 0 50 50"
      fill="black"
      stroke="currentColor"
    >
      <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z" />
    </svg>
  );
};
