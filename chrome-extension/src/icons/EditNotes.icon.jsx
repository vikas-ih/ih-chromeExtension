import React from 'react';
import { classNames } from '../utilities';

export const EditNotesIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames('edit-notes-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="20"
      height="20"
      viewBox="0 0 22 20"
      fill="rgba(5, 150, 105, 1)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 18.4615H22V20H0V18.4615ZM18.3857 5.38462C19.0143 4.76923 19.0143 3.84615 18.3857 3.23077L15.5571 0.461538C14.9286 -0.153846 13.9857 -0.153846 13.3571 0.461538L1.57143 12V16.9231H6.6L18.3857 5.38462ZM14.4571 1.53846L17.2857 4.30769L14.9286 6.61539L12.1 3.84615L14.4571 1.53846ZM3.14286 15.3846V12.6154L11 4.92308L13.8286 7.69231L5.97143 15.3846H3.14286Z"
        fill="#71717A"
      />
    </svg>
  );
};
