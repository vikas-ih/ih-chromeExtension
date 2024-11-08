import React from 'react';
import { classNames } from '../utilities';

export const AmbientpauseIcon = ({
  fill = '#000000',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames('quciktext-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.94234 15V0H15V15H8.94234ZM0 15V0H6.05766V15H0ZM10.6731 13.2693H13.2693V1.73075H10.6731V13.2693ZM1.73075 13.2693H4.32694V1.73075H1.73075V13.2693Z"
        fill="white"
      />
    </svg>
  );
};
