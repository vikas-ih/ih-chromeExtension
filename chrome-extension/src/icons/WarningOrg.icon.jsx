import React from 'react';
import { classNames } from '../utilities';

export const WarningOrgIcon = ({
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
        d="M0 15L8.5 0L17 15H0ZM2.1677 13.7143H14.8323L8.5 2.57138L2.1677 13.7143ZM8.5 12.6923C8.69194 12.6923 8.85283 12.626 8.98266 12.4933C9.11249 12.3606 9.17741 12.1962 9.17741 12C9.17741 11.8038 9.11249 11.6394 8.98266 11.5067C8.85283 11.3741 8.69194 11.3077 8.5 11.3077C8.30806 11.3077 8.14717 11.3741 8.01734 11.5067C7.88751 11.6394 7.82259 11.8038 7.82259 12C7.82259 12.1962 7.88751 12.3606 8.01734 12.4933C8.14717 12.626 8.30806 12.6923 8.5 12.6923ZM7.87098 10.4506H9.12901V6.16482H7.87098V10.4506Z"
        fill="#FC0202"
      />
    </svg>
  );
};
