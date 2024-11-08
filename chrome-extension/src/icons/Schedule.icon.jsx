import React, { useState } from 'react';
import { classNames } from '../utilities';

export const ScheduleIcon = ({
  fill = '#516F90',
  id,
  className,
  onClick,
  isFilled,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg
      className={classNames('schedule-icon', className ? className : '')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick ? onClick : () => null}
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      stroke={isFilled ? '#00D091' : isHovered ? '#00D091' : '#000'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.1704 15.584C20.5025 17.1637 19.4577 18.5557 18.1275 19.6383C16.7973 20.7209 15.2221 21.4612 13.5397 21.7944C11.8573 22.1276 10.1188 22.0436 8.47639 21.5497C6.83394 21.0559 5.33747 20.1672 4.11782 18.9614C2.89816 17.7556 1.99245 16.2694 1.47988 14.6327C0.967303 12.996 0.863466 11.2586 1.17745 9.57252C1.49143 7.88641 2.21366 6.30289 3.28102 4.96039C4.34837 3.6179 5.72833 2.5573 7.30027 1.87134"
        stroke={isFilled ? '#00D091' : isHovered ? '#00D091' : '#000'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 11.4997C22 10.1209 21.7284 8.75555 21.2007 7.48166C20.6731 6.20778 19.8997 5.05029 18.9247 4.0753C17.9497 3.10031 16.7922 2.32691 15.5183 1.79925C14.2444 1.27158 12.8791 1 11.5002 1V11.4997H22Z"
        stroke={isFilled ? '#00D091' : isHovered ? '#00D091' : '#000'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={`paint0_linear_3_908${id}`}
          x1="34.2807"
          y1="37.1105"
          x2="11.5217"
          y2="13.3103"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#059669" />
          <stop offset="0.78125" stopColor="#00D090" />
        </linearGradient>
      </defs>
    </svg>
  );
};
