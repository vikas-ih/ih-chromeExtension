import { classNames } from '../utilities';

export const Stop = ({ fill = '#000000', className, onClick }) => {
  return (
    <svg
      className={classNames(className ? className : '')}
      onClick={onClick ? onClick : () => null}
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M8 12C8 10.1144 8 9.17157 8.58579 8.58579C9.17157 8 10.1144 8 12 8C13.8856 8 14.8284 8 15.4142 8.58579C16 9.17157 16 10.1144 16 12C16 13.8856 16 14.8284 15.4142 15.4142C14.8284 16 13.8856 16 12 16C10.1144 16 9.17157 16 8.58579 15.4142C8 14.8284 8 13.8856 8 12Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
};
