import { Tag } from 'antd';
import React from 'react';

export const EncounterStatus = ({ status }) => {
  let color;
  switch (status.toLowerCase()) {
    case 'inprogress':
      color = 'blue';
      status = 'In Progress';
      break;
    case 'completed':
      color = 'green';
      status = 'Completed';
      break;
    case 'not_started':
      color = 'grey';
      status = 'Not started';
      break;
    default:
      color = 'orange';
      status = 'summary_inprogress';
  }

  return (
    <Tag color={color} key={status} className="py-2 px-3 rounded-xl">
      {status.toUpperCase()}
    </Tag>
  );
};
