import { Segmented } from 'antd';
// import { sendSegmentEvent } from '../../utils/analytics';  //check

export const SegmentedTabs = ({ options, activeTab, setActiveTab }) => {
  const handleTabChange = (tab) => {
    // sendSegmentEvent(`Switched to ${tab} Tab`);
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center items-center past">
      <Segmented
        options={options}
        value={activeTab}
        onChange={(tab) => {
          handleTabChange(tab);
        }}
      />
    </div>
  );
};
