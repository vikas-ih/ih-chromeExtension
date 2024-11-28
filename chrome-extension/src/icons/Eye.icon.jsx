import React from 'react';
import { classNames } from '../utilities';

export const EyeIcon = ({
  type = 'close',
  fill = '#4D4D4D',
  className,
  onClick,
}) => {
  const renderEyeIcon = () => {
    switch (type) {
      case 'open':
        return (
          <svg
            className={classNames(
              'eye-icon cursor-pointer',
              className ? className : ''
            )}
            onClick={onClick ? onClick : () => null}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3.33334C5.45455 3.33334 1.57273 6.16062 0 10.1515C1.57273 14.1424 5.45455 16.9697 10 16.9697C14.5455 16.9697 18.4273 14.1424 20 10.1515C18.4273 6.16062 14.5455 3.33334 10 3.33334ZM10 14.697C7.49091 14.697 5.45455 12.6606 5.45455 10.1515C5.45455 7.64243 7.49091 5.60607 10 5.60607C12.5091 5.60607 14.5455 7.64243 14.5455 10.1515C14.5455 12.6606 12.5091 14.697 10 14.697ZM10 7.42425C8.49091 7.42425 7.27273 8.64243 7.27273 10.1515C7.27273 11.6606 8.49091 12.8788 10 12.8788C11.5091 12.8788 12.7273 11.6606 12.7273 10.1515C12.7273 8.64243 11.5091 7.42425 10 7.42425Z"
              fill="#4D4D4D"
            />
          </svg>
        );
      case 'close':
        return (
          <svg
            className={classNames(
              'eye-icon cursor-pointer',
              className ? className : ''
            )}
            onClick={onClick ? onClick : () => null}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3.33334C5.45455 3.33334 1.57273 6.16062 0 10.1515C1.57273 14.1424 5.45455 16.9697 10 16.9697C14.5455 16.9697 18.4273 14.1424 20 10.1515C18.4273 6.16062 14.5455 3.33334 10 3.33334ZM10 14.697C7.49091 14.697 5.45455 12.6606 5.45455 10.1515C5.45455 7.64243 7.49091 5.60607 10 5.60607C12.5091 5.60607 14.5455 7.64243 14.5455 10.1515C14.5455 12.6606 12.5091 14.697 10 14.697ZM10 7.42425C8.49091 7.42425 7.27273 8.64243 7.27273 10.1515C7.27273 11.6606 8.49091 12.8788 10 12.8788C11.5091 12.8788 12.7273 11.6606 12.7273 10.1515C12.7273 8.64243 11.5091 7.42425 10 7.42425Z"
              fill="#4D4D4D"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return <>{renderEyeIcon()}</>;
};
