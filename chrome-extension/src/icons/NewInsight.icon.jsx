import React from 'react';
import { classNames } from '../utilities';

export const NewInsightIcon = ({
  fill = '#516F90',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames('New-Insight', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="190"
      height="38"
      viewBox="0 0 156 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#clip0_1605_286_${id})`}>
        <mask
          id={`mask0_1605_286_${id}`}
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="9"
          width="29"
          height="29"
        >
          <path
            d="M19.2036 9.45581H0V27.9953C0.00470036 30.6442 1.06615 33.1836 2.95233 35.0583C4.83851 36.933 7.39601 37.9906 10.0658 38H28.7697V18.9469C28.765 16.4312 27.7556 14.0198 25.9626 12.2409C24.1697 10.4619 21.7392 9.46049 19.2036 9.45581Z"
            fill="white"
          />
        </mask>
        <g mask={`url(#mask0_1605_286_${id})`}>
          <path d="M28.7697 9.45581H0V38H28.7697V9.45581Z" fill="#4FD3C8" />
        </g>
        <mask
          id={`mask1_1605_286_${id}`}
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="9"
          y="0"
          width="30"
          height="29"
        >
          <path
            d="M28.2348 0H9.54883V19.0708C9.55823 21.5804 10.5672 23.9846 12.3558 25.7592C14.1444 27.5337 16.5676 28.5348 19.0971 28.5442H38.3185V10.0046C38.3138 7.35267 37.2499 4.81067 35.3599 2.93546C33.4698 1.06024 30.9078 0.0046813 28.2348 0Z"
            fill="white"
          />
        </mask>
        <g mask={`url(#mask1_1605_286_${id})`}>
          <path d="M38.3185 0H9.54883V28.5442H38.3185V0Z" fill="#7AFC7D" />
        </g>
        <mask
          id={`mask2_1605_286_${id}`}
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="9"
          y="9"
          width="20"
          height="20"
        >
          <path
            d="M9.54883 9.45581H25.6113C26.4271 9.4558 27.2097 9.77611 27.7883 10.3468C28.3668 10.9174 28.6942 11.6921 28.6989 12.5015V28.5443H12.6364C11.8206 28.5396 11.0399 28.2148 10.4647 27.6408C9.88951 27.0668 9.56666 26.2903 9.56668 25.4809L9.54883 9.45581Z"
            fill="white"
          />
        </mask>
        <g mask={`url(#mask2_1605_286_${id})`}>
          <path
            d="M28.7703 9.45581H9.54883V28.5443H28.7703V9.45581Z"
            fill="#61E8DC"
          />
        </g>
        <path
          d="M57.1068 15.3305H53.8721V0.14209H57.1068V15.3305Z"
          fill="black"
        />
        <path
          d="M76.3959 0.14209V13.7867C76.4091 14.233 76.2452 14.6664 75.9401 14.9923C75.8069 15.1482 75.6427 15.2745 75.4578 15.3631C75.273 15.4518 75.0716 15.5007 74.8667 15.507C74.3178 15.4905 73.7844 15.3206 73.3271 15.0165C72.8697 14.7125 72.5066 14.2865 72.279 13.7867L66.6329 5.58228V15.3305H63.457V0.14209H66.53L73.2788 10.0815V0.14209H76.3959Z"
          fill="black"
        />
        <path
          d="M93.5109 10.8461C93.5365 11.5066 93.3949 12.1628 93.0993 12.7539C92.8038 13.3451 92.3637 13.8521 91.82 14.2279C90.549 15.0929 89.0334 15.526 87.4972 15.4629C86.0805 15.4514 84.6897 15.0822 83.4538 14.3896C82.8036 14.0082 82.262 13.4666 81.8806 12.8163C81.4663 12.1184 81.2526 11.3196 81.2631 10.5079L84.2037 10.3756C84.1983 10.743 84.2943 11.1048 84.481 11.4212C84.6678 11.7377 84.9381 11.9965 85.2623 12.1694C85.9658 12.5993 86.7757 12.8234 87.6002 12.8163C89.5116 12.8163 90.5408 12.1841 90.5408 10.9343C90.5408 9.90511 89.8792 9.30227 88.5853 9.12583L85.7917 8.83177C84.6274 8.72414 83.5242 8.26231 82.6305 7.50848C82.2368 7.1307 81.9292 6.67243 81.7287 6.16494C81.5283 5.65745 81.4396 5.11269 81.4689 4.56783C81.4589 3.92591 81.6065 3.29134 81.8987 2.7197C82.1909 2.14807 82.6189 1.65682 83.1451 1.28902C84.3672 0.399047 85.8543 -0.0517376 87.3649 0.00983444C88.8338 -0.0635061 90.2845 0.36133 91.4818 1.2155C91.9724 1.56866 92.3704 2.03522 92.6418 2.57542C92.9132 3.11562 93.0499 3.71342 93.0403 4.31788L90.2026 4.4208C89.938 3.18573 89.0411 2.5682 87.5119 2.5682C86.7435 2.52396 85.9796 2.71363 85.3212 3.11222C85.0909 3.24992 84.8988 3.44324 84.7627 3.67444C84.6265 3.90565 84.5506 4.16733 84.5419 4.43551C84.5379 4.665 84.5876 4.89225 84.6872 5.09906C84.7868 5.30586 84.9334 5.48649 85.1153 5.62647C85.5472 5.93752 86.0553 6.12554 86.5856 6.17049L89.2028 6.42044C92.0552 6.81743 93.5109 8.28775 93.5109 10.8461Z"
          fill="black"
        />
        <path
          d="M102.068 15.3305H98.877V0.14209H102.068V15.3305Z"
          fill="black"
        />
        <path
          d="M107.685 8.18484V6.30283C107.637 5.45763 107.761 4.61144 108.049 3.8154C108.337 3.01935 108.783 2.28997 109.361 1.67131C109.98 1.0986 110.708 0.656336 111.501 0.370886C112.294 0.0854352 113.136 -0.0373512 113.978 0.00984938C115.717 -0.0722782 117.419 0.523343 118.727 1.67131C119.174 2.13785 119.517 2.69316 119.735 3.30113C119.953 3.90909 120.04 4.5561 119.992 5.20009H117.051C117.051 3.50922 116.081 2.65643 114.11 2.65643C113.603 2.64085 113.099 2.74671 112.64 2.9652C112.283 3.12896 111.97 3.37603 111.729 3.68566C111.494 4.046 111.339 4.4519 111.273 4.87662C111.182 5.31284 111.123 5.75511 111.096 6.19991C111.096 6.55278 111.096 7.02329 111.096 7.67023C111.096 8.31717 111.096 8.67005 111.096 8.87589C111.096 9.08174 111.096 9.41991 111.096 9.87571C111.102 10.2162 111.161 10.5537 111.273 10.8755C111.361 11.0667 111.479 11.3313 111.64 11.6401C111.773 11.9144 111.982 12.1442 112.243 12.3017C112.917 12.6739 113.68 12.852 114.449 12.8164C115.018 12.8512 115.586 12.7197 116.082 12.4377C116.578 12.1558 116.981 11.7356 117.242 11.2284V10.2139H115.272V7.72904H119.962V12.3164C119.518 13.3555 118.722 14.2043 117.713 14.7131C116.639 15.258 115.447 15.5306 114.243 15.507C113.326 15.5929 112.401 15.4753 111.534 15.1627C110.667 14.8501 109.88 14.3502 109.229 13.6986C108.074 12.1034 107.526 10.148 107.685 8.18484Z"
          fill="black"
        />
        <path
          d="M138.223 15.3305H135.032V9.18457H129.063V15.3305H125.872V0.14209H129.063V6.5674H135.032V0.14209H138.208L138.223 15.3305Z"
          fill="black"
        />
        <path
          d="M155.236 2.78867H150.825V15.3305H147.679V2.78867H143.268V0.14209H155.177L155.236 2.78867Z"
          fill="black"
        />
        <path
          d="M66.0011 37.9736H62.8105V31.8276H56.8263V37.9736H53.6504V22.7852H56.8263V29.1958H62.8105V22.7852H66.0011V37.9736Z"
          fill="black"
        />
        <path
          d="M83.1305 37.9736H77.3668C76.0169 38.0967 74.6628 37.7878 73.4999 37.0914C73.0915 36.6865 72.7802 36.1944 72.5892 35.652C72.3982 35.1096 72.3326 34.531 72.3971 33.9596V22.7852H83.1305V25.4317H75.573V28.9899H80.8662L80.6309 31.6365H75.573V33.8273C75.546 34.0532 75.5717 34.2824 75.6482 34.4967C75.7248 34.711 75.85 34.9047 76.0141 35.0624C76.4914 35.3338 77.0407 35.4519 77.5874 35.4005H83.1305V37.9736Z"
          fill="black"
        />
        <path
          d="M101.451 37.9736H98.1284L97.2021 35.2976H91.7325L90.8356 37.9295H87.5127L92.747 24.0202C92.9023 23.6214 93.1674 23.2747 93.5116 23.0204C93.823 22.823 94.1872 22.7256 94.5555 22.741C94.902 22.7194 95.2465 22.8068 95.5407 22.991C95.8666 23.2563 96.1027 23.6157 96.217 24.0202L101.451 37.9736ZM96.4817 32.8568L94.5555 26.8285L92.5265 32.8568H96.4817Z"
          fill="black"
        />
        <path
          d="M116.565 37.9736H111.713C110.315 38.0932 108.917 37.7412 107.743 36.9738C107.314 36.5757 106.98 36.0861 106.766 35.5414C106.553 34.9967 106.464 34.4108 106.508 33.8273V22.7852H109.699V33.8273C109.675 34.0518 109.701 34.2788 109.775 34.4921C109.848 34.7055 109.968 34.9002 110.125 35.0624C110.608 35.3315 111.162 35.4493 111.713 35.4005H116.565V37.9736Z"
          fill="black"
        />
        <path
          d="M132.547 25.4317H128.136V37.9736H124.989V25.4317H120.578V22.7852H132.502L132.547 25.4317Z"
          fill="black"
        />
        <path
          d="M149.955 37.9736H146.794V31.8276H140.795V37.9736H137.604V22.7852H140.795V29.1958H146.794V22.7852H149.97L149.955 37.9736Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_1605_286">
          <rect width="156" height="38" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};