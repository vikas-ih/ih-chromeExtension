import { classNames } from '../utilities';

export const ListIcon = ({ className, onClick }) => {
  return (
    <svg
      className={classNames('cursor-pointer', className)}
      onClick={onClick}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_403_3669)">
        <path
          d="M24.0003 4.00037H7.00031V6.00036H24.0003V4.00037Z"
          fill="#374957"
        />
        <path
          d="M24.0003 10.9998H7.00031V12.9998H24.0003V10.9998Z"
          fill="#374957"
        />
        <path d="M24.0003 18H7.00031V20H24.0003V18Z" fill="#374957" />
        <path
          d="M2 6.99999C3.10457 6.99999 4 6.10456 4 5C4 3.89543 3.10457 3 2 3C0.89543 3 0 3.89543 0 5C0 6.10456 0.89543 6.99999 2 6.99999Z"
          fill="#374957"
        />
        <path
          d="M2 14.0004C3.10457 14.0004 4 13.1049 4 12.0004C4 10.8958 3.10457 10.0004 2 10.0004C0.89543 10.0004 0 10.8958 0 12.0004C0 13.1049 0.89543 14.0004 2 14.0004Z"
          fill="#374957"
        />
        <path
          d="M2 20.9997C3.10457 20.9997 4 20.1043 4 18.9997C4 17.8951 3.10457 16.9997 2 16.9997C0.89543 16.9997 0 17.8951 0 18.9997C0 20.1043 0.89543 20.9997 2 20.9997Z"
          fill="#374957"
        />
      </g>
      <defs>
        <clipPath id="clip0_403_3669">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
