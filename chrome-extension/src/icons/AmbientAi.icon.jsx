import React from 'react';
import { classNames } from '../utilities';

export const AmbientAiIcon = ({ isFilled, className, onClick }) => {
  const fill = isFilled ? '#00D091' : '#000';

  return (
    <svg
      className={classNames('teams-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12.6666C10.2067 12.6666 12 10.8733 12 8.66659V5.33325C12 3.12659 10.2067 1.33325 8 1.33325C5.79333 1.33325 4 3.12659 4 5.33325V8.66659C4 10.8733 5.79333 12.6666 8 12.6666Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7.33325V8.66659C2 11.9799 4.68667 14.6666 8 14.6666C11.3133 14.6666 14 11.9799 14 8.66659V7.33325"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.07333 4.98687C7.26 4.55353 8.55333 4.55353 9.74 4.98687"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.68666 6.98653C7.48666 6.76653 8.33333 6.76653 9.13333 6.98653"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
