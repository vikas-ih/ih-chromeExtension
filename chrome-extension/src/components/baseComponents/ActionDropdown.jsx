import { useState } from "react";
import { AlertIcon, BinIcon } from "../../icons";
import { removeEncounter } from "../../store/slice/encounter.slice";
import { useDispatch, useSelector } from "react-redux";
import { ModalComponent } from "./Modal";

export const ActionsDropdown = ({
  encounterDetailsSlice,
  storedParams,
  schedulepage,
  accessToken,
}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleRemoveEncounter = () => {
    setSubmitLoading(true);
    // if (schedulepage) {
    //   analytics.track(
    //     "Removed Encounter In Ambient Encounters List From VCA",
    //     {}
    //   );
    // } else {
    //   analytics.track(
    //     "Removed Encounter In Ambient Encounters List From Aura",
    //     {}
    //   );
    // }
    if (isModalVisible) {
      dispatch(
        removeEncounter({
          encounter_id: encounterDetailsSlice?.encounter_id,
          storedParams,
          setSubmitLoading,
          accessToken,
        })
      );
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setSubmitLoading(false);
    // if (schedulepage) {
    //   analytics.track(
    //     "Clicked Cancel After Clicking Remove Encounter In Ambient Encounters List From VCA",
    //     {}
    //   );
    // } else {
    //   analytics.track(
    //     "Clicked Cancel After Clicking Remove Encounter In Ambient Encounters List From Aura",
    //     {}
    //   );
    // }
    setIsModalVisible(false);
  };

  return (
    <>
      <a
        className="ant-dropdown-link"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsModalVisible(true);
        }}
      >
        <BinIcon />
      </a>
      <ModalComponent
        centered={true}
        open={isModalVisible}
        handleSubmit={handleRemoveEncounter}
        handleCancel={handleCancel}
        submitButtonText="Remove"
        cancelButtonText="Cancel"
        closable={false}
        className="!w-fit"
        submitLoading={submitLoading}
        additionalBody={
          <>
            {" "}
            <div className="text-black font-sans text-nowrap font-medium text-lg flex justify-center items-center gap-2">
              <span>
                {" "}
                <AlertIcon />
              </span>
              <p> Are you sure you want to remove this encounter? </p>
            </div>
          </>
        }
      />
    </>
  );
};
