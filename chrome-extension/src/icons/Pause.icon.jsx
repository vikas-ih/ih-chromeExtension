import React from 'react';
import { classNames } from "../utilities";

export const PauseIcon = ({ fill = '#059669', className, onClick }) => {
  const circumference = 2 * Math.PI * 80;

  return (
    <svg
      height="40px"
      width="40px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 271.953 271.953"
      xmlSpace="preserve"
      className={classNames('pause-icon', className ? className : '')}
      onClick={onClick}
    >
      <g>
        <circle
          cx="135.977"
          cy="135.977"
          r="120"
          stroke={fill}
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
        <rect x="90" y="85" width="100" height="100" fill="#d9534f" />
      </g>
    </svg>
  );
};
