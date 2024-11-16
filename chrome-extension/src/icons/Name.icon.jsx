import React, { useState } from 'react';
// import { Image } from 'src/components';
import { classNames, profileName } from '../utilities';
import { Image } from '../components/baseComponents';
// import { Image } from "src/components";

export const NameIcon = ({
  base64Image = null,
  name = '? ?',
  backgroundColor = '#B2FFDE',
  className,
}) => {
  const [imgError, setImgError] = useState(false);
  return (
    <>
      {base64Image && !imgError ? (
        <div className={classNames('profile-logo', className ? className : '')}>
          <Image
            className=""
            src={base64Image}
            alt="user"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div
          className={classNames(
            'profile-picture-text flex justify-center items-center',
            className ? className : ''
          )}
          style={{ background: `${backgroundColor}` }}
        >
          {name && profileName(name)}
        </div>
      )}
    </>
  );
};
