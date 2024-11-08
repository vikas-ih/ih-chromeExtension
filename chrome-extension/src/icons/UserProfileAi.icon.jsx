import React from 'react';
import { classNames } from '../utilities';

export const UserProfileAiIcon = ({ className, onClick }) => {
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
        d="M6.55562 2.875C6.55562 3.91053 5.80943 4.75 4.88896 4.75C3.96848 4.75 3.22229 3.91053 3.22229 2.875C3.22229 1.83947 3.96848 1 4.88896 1C5.80943 1 6.55562 1.83947 6.55562 2.875Z"
        stroke="#1E1F22"
      />
      <path
        d="M1 10.9997V8.84905C1 8.17591 1.34249 7.5605 1.90288 7.32455C2.65881 7.00626 3.69778 6.61414 4.88889 6.62472C6.05318 6.63506 6.94728 7.02252 7.80086 7.34459C8.39806 7.56993 8.77777 8.20999 8.77777 8.91862V9.4389V9.95917V10.9997"
        stroke="#1E1F22"
        stroke-linecap="round"
      />
      <path
        d="M7.66675 4.75C8.58722 4.75 9.33341 3.91053 9.33341 2.875C9.33341 1.83947 8.58722 1 7.66675 1"
        stroke="#1E1F22"
        stroke-linecap="round"
      />
      <path
        d="M7.94446 6.3125C8.80886 6.3125 9.61124 6.7423 10.1767 7.14864C10.7453 7.5573 11 8.24677 11 8.94705V11"
        stroke="#1E1F22"
        stroke-linecap="round"
      />
    </svg>
  );
};
