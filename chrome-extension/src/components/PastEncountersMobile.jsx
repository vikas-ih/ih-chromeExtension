import { PastEncounterTopBar } from "./PastEncounter.Topnavbar";

const PastEncountersMobile = () => {
  return (
    <div>
      <PastEncounterTopBar />
      <div className="mt-2 mb-24 p-4 relative ">
        <div
          className={`min-h-screen grid shadow-xl ant-table-wrappers rounded-xl bg-white relative  `}
        ></div>
      </div>
    </div>
  );
};

export default PastEncountersMobile;
