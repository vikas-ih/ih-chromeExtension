import React, { useState } from 'react';
import { classNames } from '../utilities';

export const UploadIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('cursor-pointer', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="57"
      height="47"
      viewBox="0 0 57 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 11.2H31.488V46.144H0V11.2Z" fill="#00D090" />
      <path d="M3.52 14.688H28V35.648H3.52V14.688Z" fill="white" />
      <path
        d="M7.008 32.1601H12.832L9.92 26.9121L7.008 32.1601ZM18.656 21.6641L12.832 32.1601H24.512L18.656 21.6641Z"
        fill="#7AFC7D"
      />
      <path
        d="M35.008 32.16V37.376L56.096 27.04L42.88 0L27.072 7.68H33.952L41.472 4.032L49.44 20.256L35.008 27.328V32.16Z"
        fill="#00D090"
      />
    </svg>
  );
};
