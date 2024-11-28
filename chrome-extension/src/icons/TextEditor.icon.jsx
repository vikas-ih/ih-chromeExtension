import React from 'react';
import { classNames } from '../utilities';

export const TextEditorIcon = ({ fill = '#fff', id, className, onClick }) => {
  return (
    <svg
      className={classNames('plus-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="46"
      height="46"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.9" y="0.9" width="44.2" height="44.2" rx="22.1" fill="white" />
      <rect
        x="0.9"
        y="0.9"
        width="44.2"
        height="44.2"
        rx="22.1"
        stroke="#0F9F67"
        strokeWidth="1.8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.2727 12C31.5862 12 31.8868 12.1245 32.1084 12.3461L35.6539 15.8916C36.1154 16.3531 36.1154 17.1014 35.6539 17.5629L19.1084 34.1084C18.8868 34.33 18.5862 34.4545 18.2728 34.4545L11.1819 34.4545C10.7039 34.4545 10.2729 34.1666 10.09 33.725C9.90707 33.2834 10.0082 32.775 10.3462 32.437L30.4371 12.3461C30.6587 12.1245 30.9593 12 31.2727 12ZM31.2727 14.8532L19.9441 26.1818L21.8182 28.0559L33.1468 16.7273L31.2727 14.8532ZM20.1469 29.7273L18.2728 27.8531L14.035 32.0909H17.7832L20.1469 29.7273Z"
        fill="#0F9F67"
      />
    </svg>
  );
};
