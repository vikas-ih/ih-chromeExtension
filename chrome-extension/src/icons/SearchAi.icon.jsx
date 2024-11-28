import React from 'react';
import { classNames } from '../utilities';

export const SearchAiIcon = ({ fill = '', className, onClick }) => {
  return (
    <svg
      className={classNames('cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 11L9.05561 9.05556M10.4444 5.72222C10.4444 8.33023 8.33023 10.4444 5.72222 10.4444C3.11421 10.4444 1 8.33023 1 5.72222C1 3.11421 3.11421 1 5.72222 1C8.33023 1 10.4444 3.11421 10.4444 5.72222Z"
        stroke="#090909"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
