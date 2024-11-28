import React from 'react';
import { classNames } from '../utilities';

export const VoiceIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('voice-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
    >
      <g filter={`url(#filter0_d_152_792${id})`}>
        <circle cx="28.5" cy="24.5" r="22.5" fill="#00D090" />
      </g>
      <path
        d="M22.9243 15.5757C22.9243 12.4963 25.4207 10 28.5001 10C31.5794 10 34.0758 12.4963 34.0758 15.5757V25.3333C34.0758 28.4126 31.5794 30.909 28.5001 30.909C25.4207 30.909 22.9243 28.4126 22.9243 25.3333V15.5757Z"
        fill="white"
      />
      <path
        d="M20.4848 25.1155V25.3332C20.4848 27.459 21.3293 29.4976 22.8324 31.0008C24.3355 32.5039 26.3742 33.3483 28.5 33.3483C30.6257 33.3483 32.6643 32.5039 34.1675 31.0008C35.6706 29.4976 36.5151 27.459 36.5151 25.3332V25.1155C36.5151 24.3456 37.1391 23.7216 37.909 23.7216H38.606C39.3758 23.7216 39.9999 24.3456 39.9999 25.1154V25.3332C39.9999 28.3832 38.7883 31.3083 36.6316 33.4649C34.89 35.2066 32.6473 36.3318 30.2424 36.7005V39.2726C30.2424 40.0424 29.6183 40.6665 28.8484 40.6665H28.1515C27.3816 40.6665 26.7575 40.0424 26.7575 39.2726V36.7005C24.3526 36.3318 22.1099 35.2066 20.3683 33.4649C18.2116 31.3083 17 28.3832 17 25.3332V25.1155C17 24.3456 17.6241 23.7216 18.3939 23.7216H19.0909C19.8607 23.7216 20.4848 24.3456 20.4848 25.1155Z"
        fill="white"
      />
      <defs>
        <filter
          id={`filter0_d_152_792${id}`}
          x="0"
          y="0"
          width="57"
          height="57"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_152_792"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_152_792"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
