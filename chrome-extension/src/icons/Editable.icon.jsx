import React from 'react';
import { classNames } from '../utilities';

export const EditableIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.55556 12.4419H2.65533L9.89956 5.18592L8.79978 4.08435L1.55556 11.3404V12.4419ZM14 14H0V10.6945L10.4494 0.228093C10.5953 0.0820451 10.7931 0 10.9993 0C11.2056 0 11.4034 0.0820451 11.5492 0.228093L13.7496 2.432C13.8954 2.5781 13.9773 2.77621 13.9773 2.98279C13.9773 3.18936 13.8954 3.38748 13.7496 3.53357L4.85567 12.4419H14V14ZM9.89956 2.98279L10.9993 4.08435L12.0991 2.98279L10.9993 1.88122L9.89956 2.98279Z"
        fill="black"
        fillOpacity="0.75"
      />
    </svg>
  );
};
