import React from 'react';
import { classNames } from '../utilities';

export const InsightHealthIcon = ({
  fill = '#516F90',
  id,
  className,
  onClick,
}) => {
  return (
    <svg
      className={classNames('insight-health-icon', className ? className : '')}
      onClick={onClick ? onClick : () => null}
      width="190"
      height="38"
      viewBox="40 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3338 3.46734C13.5424 4.07745 13.4836 5.52307 14.2202 6.25699C15.8965 7.92735 18.1736 5.36689 16.5761 3.60796C15.8833 2.84516 15.1962 2.8023 14.3338 3.46734ZM8.46317 3.90604C7.81907 4.48885 7.8061 4.56948 8.22473 5.41165C8.76532 6.49887 9.51523 6.70426 10.2545 5.96748C10.99 5.23452 10.9571 4.39235 10.1688 3.78478C9.35637 3.15815 9.28458 3.16323 8.46317 3.90604ZM3.95882 4.29426C3.49175 4.80851 3.50847 5.04691 4.05425 5.64814C4.67615 6.33254 5.69102 5.7475 5.5656 4.77677C5.46296 3.98317 4.50345 3.69462 3.95882 4.29426ZM0.0437853 4.47838C-0.0398262 4.62757 -3.87348e-05 4.94184 0.13201 5.17706C0.424361 5.69798 1.39368 5.36149 1.22328 4.79804C1.07913 4.32125 0.257139 4.09841 0.0437853 4.47838ZM18.4706 8.23336C17.4523 9.35487 18.2639 11.5439 19.6982 11.5439C20.4545 11.5439 21.4774 10.4894 21.4774 9.71008C21.4774 8.05623 19.5094 7.08994 18.4706 8.23336ZM12.7285 8.63269C12.0582 9.44819 12.1346 10.1754 12.9528 10.7656C14.2468 11.6991 15.5534 10.2316 14.702 8.80094C14.1686 7.90449 13.3821 7.83751 12.7285 8.63269ZM8.37898 8.86887C8.13017 9.14314 7.92863 9.46406 7.93094 9.58247C7.95545 10.7697 9.73868 10.9129 9.89033 9.74024C10.0157 8.76951 9.00088 8.18447 8.37898 8.86887ZM4.32267 9.32185C4.08135 9.75166 4.40686 10.2742 4.91632 10.2742C5.14495 10.2742 5.33178 9.98847 5.33178 9.63929C5.33178 8.98219 4.63607 8.76316 4.32267 9.32185ZM23.2725 12.5302C21.9883 13.0565 21.8805 15.0053 23.0877 15.876C23.9079 16.468 24.7957 16.2036 25.4005 15.1872C26.2589 13.745 24.7884 11.9087 23.2725 12.5302ZM16.9221 13.1946C16.4492 13.7152 16.4867 14.8764 16.9912 15.3373C17.6253 15.9166 18.929 15.6186 19.1902 14.8342C19.6573 13.4324 17.8758 12.1445 16.9221 13.1946ZM12.7089 13.5479C11.9558 14.1542 12.341 15.3532 13.289 15.3532C14.0934 15.3532 14.5019 14.5602 14.0787 13.8212C13.6817 13.1283 13.3198 13.0559 12.7089 13.5479ZM8.81203 13.752C8.40291 14.0304 8.57792 15.0357 9.03547 15.0357C9.17963 15.0357 9.44488 14.8405 9.62479 14.6018C10.0478 14.0406 9.39327 13.3565 8.81203 13.752ZM27.0866 17.7197C26.6974 18.1482 26.3788 18.726 26.3788 19.0037C26.3788 19.2815 26.6974 19.8592 27.0866 20.2878C27.983 21.275 28.5267 21.2705 29.4372 20.2681C30.2589 19.3634 30.1802 18.4244 29.2049 17.4959C28.4157 16.7445 27.9247 16.7966 27.0866 17.7197ZM21.2468 17.9562C21.0565 18.1657 20.9008 18.6371 20.9008 19.0037C20.9008 19.3704 21.0565 19.8418 21.2468 20.0513C21.4371 20.2608 21.8652 20.4322 22.1982 20.4322C22.5312 20.4322 22.9594 20.2608 23.1497 20.0513C23.34 19.8418 23.4956 19.3704 23.4956 19.0037C23.4956 18.6371 23.34 18.1657 23.1497 17.9562C22.9594 17.7467 22.5312 17.5752 22.1982 17.5752C21.8652 17.5752 21.4371 17.7467 21.2468 17.9562ZM16.9365 18.1028C16.4198 18.3327 16.4913 19.6935 17.0322 19.9221C17.7642 20.2313 17.9781 20.1544 18.3158 19.4596C18.8261 18.4098 18.0231 17.62 16.9365 18.1028ZM13.0263 18.4152C12.6181 18.8644 12.849 19.4799 13.4257 19.4799C13.8287 19.4799 13.9931 19.3075 13.9302 18.9507C13.8273 18.3663 13.3351 18.0749 13.0263 18.4152ZM22.7437 22.5009C22.21 23.0885 22.0705 23.4869 22.2155 24.0088C22.5384 25.1684 22.9357 25.5112 23.9567 25.5112C25.154 25.5112 25.9279 24.4268 25.6381 23.1558C25.28 21.5851 23.8661 21.2652 22.7437 22.5009ZM17.1184 22.6209C16.538 23.1384 16.4838 23.3498 16.7318 24.1288C17.0504 25.13 18.0603 25.496 18.7543 24.8617C19.3681 24.3008 19.2808 22.7412 18.6133 22.3479C17.8893 21.9216 17.9064 21.9184 17.1184 22.6209ZM12.3912 23.3044C12.2162 23.911 12.6495 24.8763 13.0964 24.8763C13.7154 24.8763 14.3252 23.9824 14.1412 23.3444C13.8774 22.4289 12.6515 22.4009 12.3912 23.3044ZM8.63962 23.3031C8.53727 23.4853 8.61165 23.844 8.80511 24.1005C9.23528 24.6716 9.99787 24.1278 9.7528 23.4247C9.56857 22.8962 8.90833 22.8241 8.63962 23.3031ZM18.4948 27.0441C17.4808 28.2777 18.1788 30.2728 19.6239 30.2728C20.4721 30.2728 21.4774 29.2395 21.4774 28.3682C21.4774 27.5066 20.4755 26.4635 19.6481 26.4635C19.2761 26.4635 18.7572 26.7248 18.4948 27.0441ZM12.8164 27.3622C12.313 27.811 12.2081 28.1358 12.3563 28.7859C12.6316 29.9934 13.895 30.3007 14.6066 29.3332C15.2738 28.4259 15.268 28.1977 14.5579 27.4158C13.8477 26.634 13.6404 26.6276 12.8164 27.3622ZM8.10768 27.9009C7.86665 28.5923 7.86146 28.5685 8.37898 29.1386C9.00088 29.823 10.0157 29.2379 9.89033 28.2672C9.77731 27.3943 8.38417 27.1076 8.10768 27.9009ZM4.35842 28.2215C4.25982 28.5043 4.3763 28.7891 4.63521 28.8986C5.17349 29.1259 5.76281 28.5618 5.4915 28.0783C5.20867 27.5742 4.55505 27.6568 4.35842 28.2215ZM14.1701 31.8057C13.5721 32.5333 13.562 33.4176 14.1418 34.3287C14.9999 35.6778 17.1527 34.8426 17.1527 33.1608C17.1527 31.4581 15.189 30.5658 14.1701 31.8057ZM8.35909 32.2914C7.50769 33.7221 8.81434 35.1896 10.1083 34.256C10.9421 33.6545 11.0104 32.7932 10.2824 32.0679C9.54724 31.3352 8.88209 31.4127 8.35909 32.2914ZM4.37803 32.1022C4.00409 32.1946 3.88184 32.4704 3.94556 33.0774C4.01533 33.7421 4.1889 33.9233 4.75515 33.9233C5.26633 33.9233 5.50102 33.7306 5.56185 33.2605C5.66421 32.4717 5.10343 31.9231 4.37803 32.1022ZM0.0437853 32.7304C-0.0398262 32.8796 -3.87348e-05 33.1938 0.13201 33.4291C0.424361 33.95 1.39368 33.6135 1.22328 33.05C1.07913 32.5733 0.257139 32.3504 0.0437853 32.7304Z"
        fill="url(#paint0_linear_188_302)"
      />
      <path
        d="M39.96 25L42.456 7.12H45.264L42.768 25H39.96ZM45.2751 25L47.0751 12.016H49.6671L49.3311 14.56L49.0431 14.152C49.4591 13.336 50.0351 12.728 50.7711 12.328C51.5231 11.928 52.3551 11.728 53.2671 11.728C54.2271 11.728 55.0511 11.952 55.7391 12.4C56.4431 12.848 56.9551 13.464 57.2751 14.248C57.6111 15.032 57.7071 15.92 57.5631 16.912L56.4351 25H53.7231L54.8031 17.2C54.9311 16.304 54.7711 15.592 54.3231 15.064C53.8751 14.52 53.2351 14.248 52.4031 14.248C51.8431 14.248 51.3231 14.376 50.8431 14.632C50.3631 14.888 49.9631 15.248 49.6431 15.712C49.3231 16.176 49.1151 16.728 49.0191 17.368L47.9631 25H45.2751ZM63.393 25.288C62.513 25.288 61.705 25.136 60.969 24.832C60.233 24.528 59.609 24.096 59.097 23.536C58.601 22.976 58.257 22.328 58.065 21.592L60.201 20.728C60.473 21.464 60.897 22.04 61.473 22.456C62.065 22.872 62.753 23.08 63.537 23.08C64.241 23.08 64.793 22.92 65.193 22.6C65.609 22.264 65.817 21.848 65.817 21.352C65.817 20.968 65.673 20.664 65.385 20.44C65.113 20.216 64.753 20.04 64.305 19.912L62.313 19.36C61.337 19.088 60.593 18.656 60.081 18.064C59.569 17.456 59.313 16.736 59.313 15.904C59.313 15.104 59.529 14.392 59.961 13.768C60.393 13.144 60.985 12.648 61.737 12.28C62.489 11.912 63.329 11.728 64.257 11.728C65.489 11.728 66.537 12.032 67.401 12.64C68.281 13.248 68.865 14.072 69.153 15.112L66.969 15.976C66.793 15.336 66.449 14.848 65.937 14.512C65.425 14.16 64.833 13.984 64.161 13.984C63.521 13.984 62.993 14.136 62.577 14.44C62.177 14.728 61.977 15.12 61.977 15.616C61.977 16 62.113 16.304 62.385 16.528C62.657 16.752 63.009 16.928 63.441 17.056L65.481 17.68C66.457 17.984 67.201 18.432 67.713 19.024C68.241 19.616 68.505 20.32 68.505 21.136C68.505 21.92 68.281 22.624 67.833 23.248C67.401 23.872 66.801 24.368 66.033 24.736C65.265 25.104 64.385 25.288 63.393 25.288ZM69.6988 25L71.4988 12.016H74.2348L72.4108 25H69.6988ZM71.7628 10.24L72.1948 7.12H74.9068L74.4748 10.24H71.7628ZM80.3571 30.28C79.3971 30.28 78.5251 30.12 77.7411 29.8C76.9571 29.48 76.3091 29.048 75.7971 28.504C75.2851 27.96 74.9331 27.328 74.7411 26.608L77.3091 25.768C77.4371 26.344 77.7811 26.816 78.3411 27.184C78.9011 27.568 79.6531 27.76 80.5971 27.76C81.2531 27.76 81.8611 27.632 82.4211 27.376C82.9811 27.12 83.4531 26.752 83.8371 26.272C84.2211 25.808 84.4611 25.24 84.5571 24.568L84.9891 21.472L85.7091 22.072C85.2131 22.904 84.5571 23.528 83.7411 23.944C82.9251 24.36 82.0211 24.568 81.0291 24.568C79.8931 24.568 78.8771 24.32 77.9811 23.824C77.0851 23.312 76.3731 22.608 75.8451 21.712C75.3331 20.8 75.0771 19.752 75.0771 18.568C75.0771 17.608 75.2451 16.712 75.5811 15.88C75.9331 15.048 76.4131 14.32 77.0211 13.696C77.6291 13.072 78.3411 12.592 79.1571 12.256C79.9731 11.904 80.8611 11.728 81.8211 11.728C82.8611 11.728 83.7891 11.952 84.6051 12.4C85.4371 12.832 86.0851 13.44 86.5491 14.224L86.0451 14.872L86.4291 12.016H89.0211L87.2691 24.664C87.1251 25.768 86.7331 26.736 86.0931 27.568C85.4531 28.416 84.6371 29.08 83.6451 29.56C82.6531 30.04 81.5571 30.28 80.3571 30.28ZM81.3651 22.048C82.1491 22.048 82.8531 21.856 83.4771 21.472C84.1011 21.072 84.5891 20.552 84.9411 19.912C85.3091 19.272 85.4931 18.576 85.4931 17.824C85.4931 17.136 85.3491 16.52 85.0611 15.976C84.7731 15.432 84.3651 15.008 83.8371 14.704C83.3251 14.4 82.7251 14.248 82.0371 14.248C81.2851 14.248 80.5891 14.44 79.9491 14.824C79.3251 15.192 78.8291 15.696 78.4611 16.336C78.0931 16.976 77.9091 17.696 77.9091 18.496C77.9091 19.184 78.0531 19.8 78.3411 20.344C78.6291 20.872 79.0371 21.288 79.5651 21.592C80.0931 21.896 80.6931 22.048 81.3651 22.048ZM89.4585 25L92.0025 6.832H94.6905L93.6105 14.56L93.2265 14.152C93.6425 13.336 94.2185 12.728 94.9545 12.328C95.7065 11.928 96.5385 11.728 97.4505 11.728C98.4105 11.728 99.2345 11.952 99.9225 12.4C100.627 12.848 101.139 13.464 101.459 14.248C101.795 15.032 101.891 15.92 101.747 16.912L100.619 25H97.9065L98.9865 17.2C99.1145 16.304 98.9545 15.592 98.5065 15.064C98.0585 14.52 97.4185 14.248 96.5865 14.248C96.0265 14.248 95.5065 14.376 95.0265 14.632C94.5465 14.888 94.1465 15.248 93.8265 15.712C93.5225 16.176 93.3225 16.728 93.2265 17.368L92.1705 25H89.4585ZM108.296 25.144C106.904 25.144 105.872 24.752 105.2 23.968C104.544 23.168 104.312 22.072 104.504 20.68L105.368 14.464H103.064L103.424 12.016H103.712C104.32 12.016 104.832 11.832 105.248 11.464C105.664 11.08 105.912 10.584 105.992 9.976L106.136 9.04H108.872L108.44 12.016H111.368L111.008 14.464H108.104L107.216 20.704C107.152 21.152 107.16 21.528 107.24 21.832C107.336 22.136 107.52 22.368 107.792 22.528C108.064 22.672 108.448 22.744 108.944 22.744C109.104 22.744 109.256 22.736 109.4 22.72C109.56 22.704 109.728 22.688 109.904 22.672L109.688 25.024C109.48 25.072 109.24 25.104 108.968 25.12C108.712 25.136 108.488 25.144 108.296 25.144ZM115.138 25L117.634 7.12H119.554L118.426 15.16H128.026L129.154 7.12H131.074L128.578 25H126.658L127.786 16.96H118.186L117.058 25H115.138ZM137.969 25.288C136.817 25.288 135.793 25.024 134.897 24.496C134.001 23.952 133.289 23.208 132.761 22.264C132.249 21.32 131.993 20.24 131.993 19.024C131.993 18.048 132.153 17.128 132.473 16.264C132.809 15.4 133.273 14.64 133.865 13.984C134.473 13.312 135.177 12.792 135.977 12.424C136.777 12.04 137.657 11.848 138.617 11.848C139.801 11.848 140.809 12.12 141.641 12.664C142.473 13.208 143.105 13.92 143.537 14.8C143.969 15.664 144.185 16.584 144.185 17.56C144.185 17.816 144.161 18.096 144.113 18.4C144.065 18.704 144.025 18.944 143.993 19.12H133.121L133.241 17.44H143.081L142.169 18.136C142.393 17.288 142.361 16.52 142.073 15.832C141.801 15.128 141.353 14.568 140.729 14.152C140.121 13.736 139.409 13.528 138.593 13.528C137.569 13.528 136.705 13.776 136.001 14.272C135.297 14.768 134.761 15.464 134.393 16.36C134.041 17.24 133.865 18.264 133.865 19.432C133.865 20.28 134.057 21.024 134.441 21.664C134.825 22.288 135.329 22.768 135.953 23.104C136.577 23.44 137.257 23.608 137.993 23.608C138.937 23.608 139.745 23.384 140.417 22.936C141.105 22.472 141.673 21.904 142.121 21.232L143.633 22.096C143.329 22.672 142.897 23.208 142.337 23.704C141.777 24.184 141.121 24.568 140.369 24.856C139.633 25.144 138.833 25.288 137.969 25.288ZM149.283 25.288C148.579 25.288 147.915 25.16 147.291 24.904C146.667 24.648 146.155 24.264 145.755 23.752C145.371 23.224 145.179 22.568 145.179 21.784C145.179 21.064 145.355 20.416 145.707 19.84C146.075 19.264 146.595 18.784 147.267 18.4C147.939 18.016 148.747 17.752 149.691 17.608L154.851 16.768L154.683 18.4L150.027 19.168C149.115 19.328 148.395 19.632 147.867 20.08C147.355 20.512 147.099 21.048 147.099 21.688C147.099 22.28 147.315 22.76 147.747 23.128C148.195 23.48 148.787 23.656 149.523 23.656C150.323 23.656 151.059 23.464 151.731 23.08C152.403 22.696 152.963 22.184 153.411 21.544C153.859 20.888 154.131 20.168 154.227 19.384L154.635 16.384C154.731 15.744 154.651 15.216 154.395 14.8C154.139 14.384 153.779 14.08 153.315 13.888C152.867 13.68 152.379 13.576 151.851 13.576C151.035 13.576 150.307 13.784 149.667 14.2C149.043 14.6 148.547 15.112 148.179 15.736L146.619 14.752C146.923 14.208 147.339 13.72 147.867 13.288C148.411 12.84 149.035 12.488 149.739 12.232C150.443 11.976 151.187 11.848 151.971 11.848C152.899 11.848 153.723 12.048 154.443 12.448C155.163 12.832 155.707 13.368 156.075 14.056C156.459 14.744 156.587 15.544 156.459 16.456L155.259 25H153.435L153.795 22.432L154.107 22.744C153.819 23.24 153.427 23.68 152.931 24.064C152.435 24.448 151.875 24.752 151.251 24.976C150.627 25.184 149.971 25.288 149.283 25.288ZM158.025 25L160.569 6.832H162.393L159.849 25H158.025ZM167.612 25.144C166.444 25.144 165.588 24.8 165.044 24.112C164.5 23.424 164.308 22.456 164.468 21.208L165.476 13.936H163.1L163.364 12.136H163.916C164.46 12.136 164.924 11.952 165.308 11.584C165.708 11.2 165.94 10.736 166.004 10.192L166.148 9.16H167.972L167.564 12.136H170.372L170.108 13.936H167.3L166.268 21.304C166.204 21.736 166.204 22.12 166.268 22.456C166.348 22.776 166.524 23.024 166.796 23.2C167.068 23.376 167.46 23.464 167.972 23.464C168.132 23.464 168.3 23.456 168.476 23.44C168.652 23.424 168.804 23.408 168.932 23.392L168.788 25.048C168.596 25.096 168.38 25.12 168.14 25.12C167.916 25.136 167.74 25.144 167.612 25.144ZM171.011 25L173.555 6.832H175.355L174.275 14.632L173.867 14.488C174.283 13.656 174.883 13.008 175.667 12.544C176.467 12.08 177.331 11.848 178.259 11.848C179.187 11.848 179.987 12.064 180.659 12.496C181.347 12.928 181.851 13.528 182.171 14.296C182.507 15.064 182.603 15.944 182.459 16.936L181.331 25H179.507L180.611 17.056C180.755 16.016 180.571 15.192 180.059 14.584C179.547 13.96 178.819 13.648 177.875 13.648C177.219 13.648 176.603 13.8 176.027 14.104C175.467 14.408 174.995 14.84 174.611 15.4C174.243 15.96 174.003 16.624 173.891 17.392L172.835 25H171.011Z"
        fill="#00D090"
      />
      <defs>
        <linearGradient
          id={`paint0_linear_188_302${id}`}
          x1="25.0834"
          y1="30.6171"
          x2="8.13614"
          y2="13.1917"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#059669" />
          <stop offset="0.78125" stopColor="#00D090" />
        </linearGradient>
      </defs>
    </svg>
  );
};