import React from 'react';
import { classNames } from "../utilities";

export const DictateStopIcon = ({
  fill = '#059669',
  className,
  onClick,
  height = '24',
  width = '24',
}) => {
  const circumference = 2 * Math.PI * 80;

  return (
    <svg
      height={height}
      width={width}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 271.953 271.953"
      xmlSpace="preserve"
      className={classNames('', className ? className : '')}
      onClick={onClick}
    >
      <g>
        <circle
          cx="135.977"
          cy="135.977"
          r="120"
          stroke="white"
          strokeWidth="15"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 135.977 135.977)"
        >
          {/* Keep the existing rotation animation */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 135.977 135.977"
            to="360 135.977 135.977"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <rect x="90" y="85" width="100" height="100" fill="white" />
      </g>
    </svg>
  );
};
