import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export const MobileLiveTranscription = ({
  fullTranscript,
  setFullTranscript,
  liveTranscript,
  livePartialTranscript,
  setLivePartialTranscript,
  className = 'current p-4 bg-transparent overflow-y-auto',
}) => {
  const placeholder = 'Transcriptions will appear in real-time here';
  const browserTimezone = moment.tz.guess();

  // live transcription functionality
  useEffect(() => {
    // Combine new transcripts with existing full transcripts
    const combinedTranscripts = [...fullTranscript, ...liveTranscript];

    const groupedTranscripts = combinedTranscripts.reduce((acc, current) => {
      // Use moment-timezone to format the timestamp to remove seconds, keeping only up to the minute
      // and adjust it to the browser's timezone
      const timestampMinute = moment(current.timestamp)
        .tz(browserTimezone)
        .format('YYYY-MM-DDTHH:mm');

      // Find if there's already an entry for this timestamp and speaker
      const existingEntryIndex = acc.findIndex(
        (entry) =>
          entry.timestamp === timestampMinute &&
          entry.speaker === current.speaker
      );

      if (existingEntryIndex !== -1) {
        // Append the current text to the found entry's text
        acc[existingEntryIndex].text += ` ${current.text}`;
      } else {
        // If it's a new minute or a new speaker, push a new entry
        acc.push({
          timestamp: timestampMinute,
          text: current.text,
          speaker: current.speaker,
        });
      }
      return acc;
    }, []);

    // Sort the transcripts in descending order of timestamp
    groupedTranscripts.sort(
      (a, b) =>
        moment(b.timestamp).tz(browserTimezone).valueOf() -
        moment(a.timestamp).tz(browserTimezone).valueOf()
    );

    // Update the state to hold the grouped and sorted transcripts
    if (groupedTranscripts?.length > 0) {
      setFullTranscript(groupedTranscripts);
      setLivePartialTranscript('');
    }
  }, [liveTranscript]);

  return (
    <div className={className}>
      {fullTranscript.map((transcript, index) => {
        return (
          <div id="transcription" key={index} className="text-gray-600 text-xs">
            <strong>
              {moment(transcript.timestamp).tz(browserTimezone).format('h:mma')}
            </strong>
            <br />
            {index === 0 ? (
              <>
                {transcript.text}
                <span className="text-gray-400"> {livePartialTranscript}</span>
              </>
            ) : (
              transcript.text
            )}
            <br />
            <br />
          </div>
        );
      })}
      {!fullTranscript?.length && !liveTranscript?.length ? (
        <div className="text-gray-400">{placeholder}</div>
      ) : null}
    </div>
  );
};
