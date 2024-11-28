import React from 'react';
import { classNames } from '../utilities';

export const LogoIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames('logo-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="54"
      height="51"
      viewBox="0 0 54 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id={`mask0_1584_412_${id}`}
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="13"
        width="41"
        height="38"
      >
        <path
          d="M27.1651 13.168H0.205627V37.1462C0.212226 40.5722 1.70237 43.8565 4.35033 46.2812C6.9983 48.7058 10.5887 50.0737 14.3368 50.0858H40.5947V25.4434C40.5881 22.1897 39.1711 19.0709 36.6539 16.7701C34.1369 14.4693 30.7248 13.1741 27.1651 13.168Z"
          fill="white"
        />
      </mask>
      <g mask={`url(#mask0_1584_412_${id})`}>
        <path
          d="M40.5947 13.168H0.205627V50.0858H40.5947V13.168Z"
          fill="#4FD3C8"
        />
      </g>
      <mask
        id={`mask1_1584_412_${id}`}
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="12"
        y="0"
        width="42"
        height="39"
      >
        <path
          d="M39.3628 0.311157H12.2388V25.8144C12.2525 29.1705 13.7171 32.3856 16.3134 34.7588C18.9096 37.1318 22.4271 38.4706 26.0988 38.4831H54V13.6902C53.9932 10.1438 52.4489 6.74444 49.7054 4.23673C46.9618 1.72901 43.2429 0.317417 39.3628 0.311157Z"
          fill="white"
        />
      </mask>
      <g mask={`url(#mask1_1584_412_${id})`}>
        <path d="M54 0.311157H12.2388V38.4831H54V0.311157Z" fill="#7AFC7D" />
      </g>
      <mask
        id={`mask2_1584_412_${id}`}
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="12"
        y="12"
        width="29"
        height="27"
      >
        <path
          d="M12.2388 12.9563H35.5546C36.7388 12.9563 37.8748 13.3846 38.7147 14.1478C39.5544 14.9109 40.0297 15.9469 40.0365 17.0293V38.4832H16.7207C15.5365 38.4769 14.4032 38.0426 13.5683 37.275C12.7334 36.5074 12.2647 35.469 12.2648 34.3865L12.2388 12.9563Z"
          fill="white"
        />
      </mask>
      <g mask={`url(#mask2_1584_412_${id})`}>
        <path
          d="M40.1401 12.9563H12.2388V38.4832H40.1401V12.9563Z"
          fill="#61E8DC"
        />
      </g>
    </svg>
  );
};
