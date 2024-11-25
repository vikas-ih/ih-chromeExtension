import React from 'react';
import { classNames } from '../utilities';

export const MicroPhone = ({ fill = '#fff', id, className, onClick }) => {
  return (
    <svg
      className={classNames('quciktext-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="25"
      height="30"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 25.8332C20.4133 25.8332 24 22.2465 24 17.8332V11.1665C24 6.75317 20.4133 3.1665 16 3.1665C11.5867 3.1665 8 6.75317 8 11.1665V17.8332C8 22.2465 11.5867 25.8332 16 25.8332Z"
        stroke="white"
        strokeWidth="2.18182"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15.1665V17.8332C4 24.4598 9.37333 29.8332 16 29.8332C22.6267 29.8332 28 24.4598 28 17.8332V15.1665"
        stroke="white"
        strokeWidth="2.18182"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.147 10.4735C14.5203 9.60682 17.107 9.60682 19.4803 10.4735"
        stroke="white"
        strokeWidth="2.18182"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3735 14.4736C14.9735 14.0336 16.6669 14.0336 18.2669 14.4736"
        stroke="white"
        strokeWidth="2.18182"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
