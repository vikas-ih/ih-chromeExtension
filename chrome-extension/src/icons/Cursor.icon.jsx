import React from 'react';
import { classNames } from '../utilities';

export const CursorIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames('dashboard-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#ffffff"
    >
      <path d="M80-480v-80h120v80H80Zm136 222-56-58 84-84 58 56-86 86Zm28-382-84-84 56-58 86 86-58 56Zm476 480L530-350l-50 150-120-400 400 120-148 52 188 188-80 80ZM400-720v-120h80v120h-80Zm236 80-58-56 86-86 56 56-84 86Z" />
    </svg>
  );
};