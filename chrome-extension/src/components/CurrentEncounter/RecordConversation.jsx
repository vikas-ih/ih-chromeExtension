import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

const RecordConversation = ({ transcriptions, encounterStatus, record }) => {
  const { transcriptionbyIdValue } = useSelector(
    (state) => state?.encounterState
  );

  const browserTimezone = moment.tz.guess();
  const isMobileView = window.innerWidth <= 1260;

  return (
    <div className="style-15">
      {encounterStatus === 'inprogress' ? (
        <div className=" p-5">Transcription in progress</div>
      ) : (
        <>
          <div
            className="min-h-screen p-5 "
            style={{ minHeight: isMobileView ? '77vh' : '' }}
          >
            {transcriptionbyIdValue?.length === 0 ? (
              'Transcription generation in progress'
            ) : transcriptionbyIdValue[0]?.transcription_json?.length > 0 &&
              Array.isArray(transcriptionbyIdValue[0]?.transcription_json) ? (
              transcriptionbyIdValue[0]?.transcription_json.map(
                (transcription, index) => (
                  <div
                    key={index}
                    className={`message ${
                      index % 2 === 0 ? 'left' : 'right'
                    } mb-2`}
                  >
                    <div className="speaker text-gray-400">
                      {transcription?.time
                        ? transcription.time
                        : moment(transcription.timestamp)
                            .tz(browserTimezone)
                            .format('h:mma')}
                    </div>
                    <div className="text text-black">{transcription.text}</div>
                  </div>
                )
              )
            ) : (
              <div className="no-messages mt-2">
                {transcriptionbyIdValue[0]?.transcription_json.length === 0
                  ? 'No transcription data available'
                  : ''}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecordConversation;
