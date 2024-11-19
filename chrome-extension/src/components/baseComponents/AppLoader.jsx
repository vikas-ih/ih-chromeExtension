import React from 'react';
import { Bars } from 'react-loader-spinner';
import { NewInsightIcon } from '../../icons';
// import { NewInsightIcon } from 'src/icons';

export const AppLoaderPage = ({ app_name }) => {
  return (
    <div className="loader-wrapper flex flex-col items-center justify-center w-[100vw] h-[100vh]">
      <NewInsightIcon />
      <div className="text-red-600 font-xl flex justify-center mt-2 font-bold text-lg">
        {app_name}
      </div>
      <Bars
        height="25"
        width="25"
        color="#00D090"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="pt-1 sm:pt-2"
        visible={true}
      />
    </div>
  );
};
