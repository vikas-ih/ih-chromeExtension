import { classNames } from '../utilities';
export const PrintIcon = ({ fill = '', id, className, onClick }) => {
  return (
    <svg
      className={classNames(' cursor-pointer', className ? className : '')}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_403_3391)">
        <path
          d="M24 9C24 8.20435 23.6839 7.44129 23.1213 6.87868C22.5587 6.31607 21.7956 6 21 6H19V0H5V6H3C2.20435 6 1.44129 6.31607 0.87868 6.87868C0.31607 7.44129 0 8.20435 0 9L0 21H5V24H19V21H24V9ZM7 2H17V6H7V2ZM17 22H7V16H17V22ZM22 19H19V14H5V19H2V9C2 8.73478 2.10536 8.48043 2.29289 8.29289C2.48043 8.10536 2.73478 8 3 8H21C21.2652 8 21.5196 8.10536 21.7071 8.29289C21.8946 8.48043 22 8.73478 22 9V19Z"
          fill="#374957"
        />
        <path d="M19 9.99939H15V11.9994H19V9.99939Z" fill="#374957" />
      </g>
      <defs>
        <clipPath id="clip0_403_3391">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
