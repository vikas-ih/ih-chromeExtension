import React from 'react';
import { classNames } from '../utilities';

export const BackIconMobile = ({ className, onClick }) => {
  return (
    <svg
      className={classNames(
        'backIcon-mobile cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="25"
      height="25"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.628776 4.89543C2.34264 0.82464 7.0351 -1.0868 11.106 0.630621C15.1769 2.34804 17.0847 7.03681 15.3709 11.1076C13.657 15.1784 8.96455 17.0862 4.89367 15.3688C1.92944 14.1221 0 11.2154 0 7.99972C0 6.93262 0.211987 5.8763 0.628776 4.89543ZM7.97647 14.8981C11.7851 14.8981 14.875 11.8082 14.875 7.99972C14.875 4.19121 11.7851 1.1013 7.97647 1.1013C4.16789 1.1013 1.0779 4.19121 1.0779 7.99972C1.0779 11.8082 4.16789 14.8981 7.97647 14.8981ZM6.97043 3.85707L2.8277 7.99972L6.97043 12.1424L7.73215 11.3807L4.88649 8.53866H12.3671V7.46078H4.88649L7.72856 4.61877L6.97043 3.85707Z"
        fill="#00D090"
      />
    </svg>
  );
};
