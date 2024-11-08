import React from 'react';
import { classNames } from '../utilities';

export const ResumeIcon = ({
  className,
  onClick,
  width = '19',
  height = '17',
}) => {
  return (
    <svg
      className={classNames('quciktext-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width={width}
      height={height}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 17V0H1.71234V17H0ZM5.7955 17L19 8.5L5.7955 0V17ZM7.5078 13.6602V3.33981L15.526 8.5L7.5078 13.6602Z"
        fill="white"
      />
    </svg>
  );
};
