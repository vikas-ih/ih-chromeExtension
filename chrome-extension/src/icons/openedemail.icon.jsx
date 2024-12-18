import React from 'react';
import { classNames } from '../utilities';

export const OpenedEmailIcon = ({
  fill = '#5bd2ad',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.23643 0.172037L16.2929 3.95305C16.5668 4.08619 16.7531 4.26136 16.8519 4.47856C16.9506 4.69575 17 4.9158 17 5.1387V13.7253C17 14.0695 16.8581 14.3681 16.5743 14.6208C16.2906 14.8736 15.9554 15 15.569 15H1.42602C1.04091 15 0.706955 14.8736 0.424165 14.6208C0.141388 14.3681 0 14.0695 0 13.7253V5.1387C0 4.9158 0.05119 4.69575 0.15357 4.47856C0.25595 4.26136 0.438789 4.08619 0.702085 3.95305L7.75854 0.172037C7.9911 0.0573458 8.23921 0 8.50287 0C8.76653 0 9.01105 0.0573458 9.23643 0.172037ZM8.49749 8.5988L15.4502 4.95323L8.49749 1.2141L1.54478 4.95323L8.49749 8.5988ZM7.77947 9.52453L1.42602 6.19092V13.7253H15.569V6.19092L9.2155 9.52453C8.99136 9.63923 8.75233 9.69658 8.49841 9.69658C8.2445 9.69658 8.00486 9.63923 7.77947 9.52453Z"
        fill="#5A62C1"
        fill-opacity="0.78"
      />
    </svg>
  );
};
