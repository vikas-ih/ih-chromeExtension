import React from 'react';
import { classNames } from '../utilities';

export const RightPanelOpenIcon = ({
  fill = '#5f6368',
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames(
        'right-panel-open-icon',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={fill}
    >
      <path d="M460-320v-320L300-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z" />
    </svg>
  );
};