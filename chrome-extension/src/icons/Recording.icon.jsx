import React from 'react';
import { classNames } from '../utilities';

export const RecordingIcon = ({ fill = '#000000', className, onClick }) => {
  return (
    <svg
      width="146"
      height="140"
      viewBox="0 0 146 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M99.315 98.0508C145.076 66.6365 126.863 23.3803 90.3981 9.83168C73.3912 3.51276 75.9891 27.0771 54.8567 47.9357C33.7243 68.7944 6.65981 102.01 34.8946 116.437C63.1295 130.864 79.9862 111.32 99.315 98.0508Z"
        fill="url(#paint0_linear_3054_410)"
      />
      <path
        d="M29.8342 67.1715C37.1774 43.7696 37.5721 9.74963 64.361 9.74963C85.5101 9.74963 102.787 18.6596 113.709 36.5497C124.63 54.4398 145.717 58.0929 145.717 71.3096C145.717 95.2887 103.436 107.837 77.6774 105.33C51.9189 102.823 22.491 90.5733 29.8342 67.1715Z"
        fill="url(#paint1_linear_3054_410)"
        fill-opacity="0.3"
        style="mix-blend-mode:plus-lighter"
      />
      <path
        d="M82.9244 117.738C88.7812 143.4 130.091 133.68 112.271 111C94.4511 88.3196 95.2302 89.8415 80.8874 72.9296C79.8068 89.3661 77.0676 92.0759 82.9244 117.738Z"
        fill="url(#paint2_linear_3054_410)"
      />
      <path
        d="M78.1472 97.8568C58.2374 95.6094 50.9473 91.5593 53.8471 73.5568C56.7469 55.5543 66.4669 59.6043 78.1472 49.2568C89.8274 38.9093 96.6477 48.0019 106.837 67.2593C117.027 86.5167 98.057 100.104 78.1472 97.8568Z"
        fill="url(#paint3_linear_3054_410)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3054_410"
          x1="45.3524"
          y1="31.6886"
          x2="108.278"
          y2="89.7822"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0F9F67" />
          <stop offset="1" stop-color="#09CD80" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3054_410"
          x1="126.563"
          y1="85.7496"
          x2="142.571"
          y2="55.1264"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#09CD80" />
          <stop offset="0.665732" stop-color="#09CD80" />
          <stop offset="0.911525" stop-color="#09CD80" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3054_410"
          x1="113"
          y1="138.5"
          x2="94.7917"
          y2="94.7563"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0F9F67" stop-opacity="0" />
          <stop offset="1" stop-color="#0F9F67" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_3054_410"
          x1="130.5"
          y1="72"
          x2="53.8472"
          y2="73.5568"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.179" stop-color="#B8FAE0" stop-opacity="0.14" />
          <stop offset="0.660872" stop-color="#D0FEEC" />
          <stop offset="1" stop-color="#67F4BC" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
