import React, { useState } from 'react';
// import { ModalComponent } from '../baseComponents';
// import { AlertIcon } from 'src/icons';
import { useDispatch } from 'react-redux';
import { ModalComponent } from '../baseComponents/Modal';
import { AlertIcon } from '../../icons';
import { removeAppointmentAction } from '../../store/actions/appointment.action';
// import { removeAppointmentAction } from 'src/store/actions/appointment.action';

export const DeleteAppointment = ({
  isOpen,
  onCancel,
  setIsOpen,
  deleteText,
  startIndex,
  isfilterOn,
  accessToken,
}) => {
  const dispatch = useDispatch();
  const initialValues = {};
  const [submitLoading, setSubmitLoading] = useState(false);

  const sections = [
    {
      heading: (
        <div className="flex items-center">
          <AlertIcon className="mr-2" /> Remove Appointment ?
        </div>
      ),
      className: "grid grid-cols-1 gap-4",
      fields: [
        {
          type: "label",
          title:
            deleteText?.isExpired === false ? (
              <span>
                This appointment has not been completed. Are you sure you want
                to remove the appointment for patient{" "}
                <span className="font-bold">{deleteText?.patient_Name}</span> ?
              </span>
            ) : (
              <span>Are you sure you want to remove this appointment ?</span>
            ),
        },
      ],
    },
  ];
  console.log("sections,sections", sections);
  return (
    <ModalComponent
      open={isOpen}
      className={"delete-modal"}
      formClassName={"grid grid-cols-1 gap-4"}
      initialValues={initialValues}
      sections={sections}
      submitButtonText="Remove"
      cancelButtonText="Cancel"
      submitLoading={submitLoading}
      handleCancel={() => {
        onCancel();
        setSubmitLoading(false);
      }}
      handleSubmit={() => {
        setSubmitLoading(true);
        dispatch(
          removeAppointmentAction(
            deleteText?.appt_uuid,
            setIsOpen,
            startIndex,
            isfilterOn,
            setSubmitLoading,
            accessToken
          )
        );
      }}
    />
  );
};
