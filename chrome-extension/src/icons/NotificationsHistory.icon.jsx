import React from 'react';
import { classNames } from '../utilities';

export const NotificationsHistoryIcon = ({
  // fill = "#516F90",
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
      width="16"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 18"
      fill="none"
    >
      <path
        d="M6.81818 14.0909H1V1H18.4545V5.36364"
        stroke="#666666"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <path
        d="M3.90909 3.90918L9.72727 9.00009L15.5455 3.90918"
        stroke="#666666"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <path
        d="M11.1455 8L7 11.6364"
        stroke="#666666"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <path
        d="M11.9091 14.0909H19.1818L18.5273 13.1454C18.0182 12.3454 17.7273 11.4 17.7273 10.4545C17.7273 9.21816 16.7818 8.27271 15.5455 8.27271C14.3091 8.27271 13.3636 9.21816 13.3636 10.4545C13.3636 11.4 13.0727 12.3454 12.5636 13.1454L11.9091 14.0909Z"
        stroke="#666666"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 15.5454C17 16.3454 16.3455 17 15.5455 17C14.7455 17 14.0909 16.3454 14.0909 15.5454"
        stroke="#666666"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
    </svg>
  );
};
