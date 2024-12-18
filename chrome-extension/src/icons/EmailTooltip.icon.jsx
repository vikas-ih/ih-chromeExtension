import React from 'react';
import { classNames } from '../utilities';

export const EmailTooltipIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 -960 960 960"
      fill="#807E7E"
    >
      <path d="M172.309-180.001q-30.308 0-51.308-21t-21-51.308v-455.382q0-30.308 21-51.308t51.308-21h615.382q30.308 0 51.308 21t21 51.308v455.382q0 30.308-21 51.308t-51.308 21H172.309ZM480-457.694 160-662.309v410q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h615.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-410L480-457.694ZM480-520l313.846-200H166.154L480-520ZM160-662.309V-720-252.309q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462H160v-422.309Z" />
    </svg>
  );
};
