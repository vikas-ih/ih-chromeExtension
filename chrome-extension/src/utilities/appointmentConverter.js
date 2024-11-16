

  useEffect(() => {
    if (
      getAppointmentStatusList &&
      Array.isArray(getAppointmentStatusList) &&
      getAppointmentStatusList.length > 0
    ) {
      let doctorNames = [
          {
            label: "All",
            value: "All",
          },
        ],
        patientNames = [];
      let newData = null;
      newData = getAppointmentStatusList?.map((list, index) => {
        const practitionerName =
          list?.practitioner_firstName || list?.practitioner_lastName
            ? `${list.practitioner_firstName} ${list.practitioner_lastName}`
            : "N/A";

        const patientName =
          list?.patient_firstName || list?.patient_lastName
            ? `${list.patient_firstName} ${list.patient_lastName}`
            : "N/A";

        !doctorNames.some(
          (doctor) =>
            doctor.value ===
            `${list?.practitioner_title} ${practitionerName.trim()}`
        ) &&
          doctorNames.push({
            id: list?.practitioner_id,
            label: `${
              list?.practitioner_title ? list?.practitioner_title + ". " : ""
            }${practitionerName.trim()}`,
            value: `${
              list?.practitioner_title ? list?.practitioner_title + ". " : ""
            }${practitionerName.trim()}`,
          });
        !patientNames.some((patient) => patient.value === patientName.trim()) &&
          patientNames.push({
            id: patientName.trim(),
            value: patientName.trim(),
            patient_id: list?.patient_id,
          });
        return {
          key: index,
          practitioner_Name: `${
            list?.practitioner_title ? list?.practitioner_title + ". " : ""
          } ${practitionerName?.trim()}`,

          patient_Name: patientName.trim(),
          appointmentDateTime: {
            date: list?.start_date ? list?.start_date : "N/A",
            time: list?.start_time ? list?.start_time : "N/A",
          },
          practitioner_firstName: list?.practitioner_firstName,
          practitioner_lastName: list?.practitioner_lastName,
          dateofBirth: list?.birth_date ? list?.birth_date : "N/A",
          patient_lastName: list?.patient_lastName,
          appointment_id: list?.appointment_id,
          intakeStatus: list?.chat_completion_status,
          llm_chat_url: list?.llm_chat_url,
          appt_uuid: list?.appt_uuid,
          settings: list?.settings,
          patient_id: list?.patient_id,
          condition_name: list?.condition_name
            ? list?.condition_name == "Unknown"
              ? nonVCACondition
              : list?.condition_name
            : "N/A",
          notification_status: list?.notification_status,
          isExpired: list?.isExpired,
          actions:
            list?.settings?.enable_patient_email_notifications ||
            list?.settings?.enable_patient_sms_notifications,
        };
      });
      if (newData && Array.isArray(newData) && newData.length > 0) {
        setData(newData);
        setFilteredData(newData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [getAppointmentStatusList]);