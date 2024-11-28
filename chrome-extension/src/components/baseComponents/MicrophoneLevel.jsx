import React from 'react';
import { Progress } from 'antd';

export const MicrophoneLevel = ({ micLevel }) => {
  const conicColors = {
    '0%': '#FF0000',
    '25%': '#E7EE00',
    '50%': '#E7EE00',
    '75%': '#3CE329',
    '100%': '#3CE329',
  };
  return (
    <div className="w-full mb-4 flex justify-center">
      {micLevel === 'offline' ? (
        <div className="text-[#667085]">Lost connection. Reconnecting...</div>
      ) : (
        <Progress
          percent={micLevel}
          strokeColor={conicColors}
          showInfo={false}
        />
      )}
    </div>
  );
};
