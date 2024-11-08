import React from 'react';
import { Bars } from 'react-loader-spinner';

export const LoadingBar = () => {
  return (
    <Bars
      height="25"
      width="25"
      color="#00D090"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass="pt-1 sm:pt-2 justify-center"
      visible={true}
    />
  );
};
