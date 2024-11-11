import React from 'react';
import {
  CheckOutlined,
  ExclamationOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import moment from 'moment';

export const SummaryUpdatedStatus = ({
  updatedTime,
  isSaving,
  isSummaryOutdated,
  encounterStatus,
}) => {
  return (
    encounterStatus === 'completed' &&
    (isSummaryOutdated ? (
      <div className="flex justify-center text-xs text-orange-400">
        <ExclamationOutlined style={{ color: 'inherit' }} className="mr-1" />A
        newer summary is available. Reload the page to make edits.
      </div>
    ) : (
      <div className="justify-center text-xs text-gray-400 mt-2">
        {isSaving ? (
          <div>
            <LoadingOutlined className="mr-1" /> Saving...
          </div>
        ) : updatedTime ? (
          <div>
            <CheckOutlined className="mr-1 justify-center" />
            Saved at {moment(updatedTime).format('MM/DD/YY h:mm a')}
          </div>
        ) : (
          ''
        )}
      </div>
    ))
  );
};
