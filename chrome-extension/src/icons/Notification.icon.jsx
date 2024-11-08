import React from 'react';
import { classNames } from '../utilities';

export const NotificationIcon = ({
  fill = '#516F90',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames(
        'notification-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="23"
      height="25"
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 8.72867C18.5 6.99243 17.7625 5.3273 16.4497 4.09959C15.137 2.87188 13.3565 2.18216 11.5 2.18216C9.64348 2.18216 7.86301 2.87188 6.55025 4.09959C5.2375 5.3273 4.5 6.99243 4.5 8.72867C4.5 16.3663 1 18.5484 1 18.5484H22C22 18.5484 18.5 16.3663 18.5 8.72867Z"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5184 22.9128C13.3132 23.2435 13.0188 23.518 12.6646 23.7088C12.3104 23.8996 11.9088 24 11.5 24C11.0912 24 10.6896 23.8996 10.3354 23.7088C9.98121 23.518 9.6868 23.2435 9.48169 22.9128"
        stroke="#191D23"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="18.5" cy="3.27325" rx="3.5" ry="3.27325" fill="#047857" />
    </svg>
  );
};
