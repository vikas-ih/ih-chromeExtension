import React from 'react';
import { Progress } from 'antd';

export const MicTest = ({ micLevel }) => {
  return (
    <div className="w-full mb-4 ">
      <Progress percent={micLevel} strokeColor="#06E690" showInfo={false} />
    </div>
  );
};
