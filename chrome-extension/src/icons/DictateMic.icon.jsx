import { classNames } from '../utilities';

export const DictateMic = ({
  id,
  className,
  onClick,
  height = '24',
  width = '24',
}) => {
  return (
    <svg
      className={classNames('quciktext-icon', className)}
      onClick={onClick || (() => null)}
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
    >
      <g>
        <path
          d="M12,14c1.66,0,3-1.34,3-3V5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z"
          fill="none"
          stroke="white"
        />
        <path
          d="M17,11c0,2.76-2.24,5-5,5s-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c3.39-0.49,6-3.39,6-6.92H17z"
          fill="none"
          stroke="white"
        />
      </g>
    </svg>
  );
};
