import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';

const SummaryProgressBar = ({ verbosity }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const totalSeconds = 60;
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevPercent + 100 / totalSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [verbosity]);

  return (
    <div style={{ marginTop: '-8px', marginInlineEnd: '0px' }}>
      <Progress
        percent={Math.round(percent)}
        status="active"
        showInfo={false}
        strokeColor="#00D090"
      />
    </div>
  );
};

export default SummaryProgressBar;
