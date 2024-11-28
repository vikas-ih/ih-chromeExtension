import React from 'react';
import { classNames } from '../utilities';

export const UserAiIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 2.875C7.25 3.91053 6.41053 4.75 5.375 4.75C4.33947 4.75 3.5 3.91053 3.5 2.875C3.5 1.83947 4.33947 1 5.375 1C6.41053 1 7.25 1.83947 7.25 2.875Z"
        stroke="#1E1F22"
      />
      <path
        d="M1 11.0001V8.84945C1 8.17631 1.3853 7.5609 2.01574 7.32495C2.86616 7.00666 4.30001 6.62512 5.375 6.62512C6.47266 6.62512 7.69069 7.02292 8.65097 7.34499C9.32282 7.57033 9.75 8.21039 9.75 8.91902V11.0001"
        stroke="#1E1F22"
        stroke-linecap="round"
      />
    </svg>
  );
};
