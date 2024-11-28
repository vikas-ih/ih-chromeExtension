/* eslint-disable react/prop-types */
import { Button } from 'antd';
import RecordingGif from '../../assets/record-ddffce58.gif';
import { AmbientpauseIcon } from '../../icons';
import { endStream } from '../../utilities/listen';

const MicrophoneBar = ({
  currentActive,
  isRecording,
  setIsRecording,
  setIsStreaming,
}) => {
  const handlePauseRecording = () => {
    setIsRecording(false);
    setIsStreaming(false);
    endStream();
    // if (schedulepage) {
    //   analytics.track(`Clicked Pause ${noteType} In Ambient From VCA`, {});
    // } else {
    //   analytics.track(`Clicked Pause ${noteType} In Ambient From Aura`, {});
    // }
  };
  const handlePauseResumeToggle = () => {
    if (isRecording) {
      console.log('isRecordingMicro', isRecording);

      handlePauseRecording();
    }
  };
  return (
    <div className="flex items-center justify-around border-t">
      <span className=" bg-[#F5F5F5]  flex items-center justify-center text-black font-normal p-2 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
        {currentActive}

        <span className="bg-[#F5F5F5] flex items-center justify-center gap-1 text-black font-normal p-2 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
          Recording
          <img
            src={RecordingGif}
            alt="Recording Icon"
            style={{ width: '35px', height: '35px' }}
          />
        </span>
      </span>
      <Button
        id={'pause_record'}
        type={'button'}
        className="bg-[#A9A9A9] hover:bg-[#696969] flex items-center justify-center text-white font-normal p-2 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        onClick={handlePauseResumeToggle}
      >
        <div className="flex items-center gap-1">
          <span className="mr-2 mt-0 text-black">
            <AmbientpauseIcon />
          </span>
          Pause {currentActive === 'Pre-chart' ? 'pre-charting' : 'visit'}
        </div>
      </Button>
    </div>
  );
};

export default MicrophoneBar;
