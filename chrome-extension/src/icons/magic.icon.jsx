import React from 'react';
import { classNames } from '../utilities';

export const MagicIcon = ({ fill = '#516F90', id, className, onClick }) => {
  return (
    <svg
      className={classNames(
        'magic-icon cursor-pointer',
        className ? className : ''
      )}
      onClick={onClick ? onClick : () => null}
      width="15"
      height="15"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.59271 0.400806C8.8027 -0.133602 9.5576 -0.133602 9.76759 0.400806L10.0424 1.10006L10.7387 1.3757C11.2711 1.58646 11.2711 2.34138 10.7387 2.55215L10.0424 2.82779L9.76759 3.52704C9.5576 4.06144 8.8027 4.06145 8.59271 3.52704L8.31794 2.82779L7.62158 2.55215C7.08919 2.34139 7.08919 1.58646 7.62158 1.3757L8.31794 1.10006L8.59271 0.400806ZM9.18012 0.661167L9.44641 1.33874C9.51035 1.50153 9.63894 1.6308 9.80181 1.69529L10.4804 1.96392L9.80181 2.23256C9.63894 2.29705 9.51035 2.42631 9.44641 2.58911L9.18012 3.26668L8.91389 2.58911C8.84995 2.42631 8.72136 2.29705 8.55842 2.23256L7.87985 1.96392L8.55842 1.69529C8.72136 1.6308 8.84995 1.50153 8.91389 1.33874L9.18012 0.661167Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.683192 1.16464C1.59411 0.253715 3.07101 0.253715 3.98193 1.16464L11.8354 9.01809C12.7463 9.92899 12.7463 11.4059 11.8354 12.3168C10.9245 13.2277 9.44755 13.2277 8.53664 12.3168L0.683192 4.46337C-0.227731 3.55245 -0.227731 2.07556 0.683192 1.16464ZM3.30101 1.84556C2.76615 1.31069 1.89897 1.31069 1.36411 1.84556C0.829248 2.38042 0.829248 3.24759 1.36411 3.78245L2.38247 4.80081L4.31936 2.86392L3.30101 1.84556ZM9.21759 11.6359L3.06339 5.48175L5.00031 3.54484L11.1544 9.69904C11.6893 10.2339 11.6893 11.1011 11.1544 11.6359C10.6196 12.1708 9.75242 12.1708 9.21759 11.6359Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2502 4.78044C12.0403 4.24604 11.2853 4.24604 11.0753 4.78044L10.9761 5.03292L10.7249 5.13235C10.1924 5.34311 10.1924 6.09804 10.7249 6.3088L10.9761 6.40825L11.0753 6.66074C11.2853 7.19512 12.0403 7.19512 12.2502 6.66074L12.3494 6.40825L12.6006 6.3088C13.133 6.09804 13.133 5.34311 12.6006 5.13235L12.3494 5.03292L12.2502 4.78044ZM11.6628 5.04081L11.5721 5.2716C11.5081 5.43439 11.3795 5.56366 11.2166 5.62818L10.9832 5.72056L11.2166 5.813C11.3795 5.87752 11.5081 6.00675 11.5721 6.16956L11.6628 6.40035L11.7535 6.16956C11.8174 6.00675 11.9459 5.87752 12.1089 5.813L12.3424 5.72056L12.1089 5.62818C11.9459 5.56366 11.8174 5.43439 11.7535 5.2716L11.6628 5.04081Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.55222 8.74673C1.7622 8.21235 2.51714 8.21235 2.72712 8.74673L2.82633 8.99922L3.07753 9.09867C3.60996 9.30943 3.60996 10.0643 3.07752 10.2751L2.82633 10.3745L2.72712 10.627C2.51714 11.1614 1.7622 11.1614 1.55222 10.627L1.45301 10.3745L1.20182 10.2751C0.669382 10.0643 0.669382 9.30943 1.20181 9.09867L1.45301 8.99922L1.55222 8.74673ZM2.04898 9.23791L2.13967 9.00712L2.23036 9.23791C2.29433 9.40072 2.42289 9.52995 2.58581 9.59447L2.81929 9.68691L2.58581 9.77929C2.42289 9.84381 2.29433 9.97304 2.23036 10.1358L2.13967 10.3666L2.04898 10.1358C1.98501 9.97304 1.85645 9.84381 1.69353 9.77929L1.46005 9.68691L1.69353 9.59447C1.85645 9.52995 1.98501 9.40072 2.04898 9.23791Z"
        fill="white"
      />
    </svg>
  );
};