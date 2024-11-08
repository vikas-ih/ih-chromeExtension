import React from 'react';
import { classNames } from '../utilities';

export const QRCodeIcon = ({ fill = '', className, onClick }) => {
  return (
    <svg
      className={classNames('', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="3" height="3" fill={fill || '#666666'} />
      <rect x="1" y="7" width="3" height="3" fill={fill || '#666666'} />
      <rect x="1" y="13" width="3" height="3" fill={fill || '#666666'} />
      <rect x="7" y="1" width="3" height="3" fill={fill || '#666666'} />
      <rect x="7" y="7" width="3" height="3" fill={fill || '#666666'} />
      <rect x="13" y="1" width="3" height="3" fill={fill || '#666666'} />
      <rect x="13" y="7" width="3" height="3" fill={fill || '#666666'} />
      <rect x="7" y="13" width="3" height="3" fill={fill || '#666666'} />
      <rect x="13" y="13" width="3" height="3" fill={fill || '#666666'} />
    </svg>
  );
};
