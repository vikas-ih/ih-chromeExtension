// 

export const formatEncounterStatus = (encounter) => {
  if (!encounter) {
    return { displayStatus: "", color: "" };
  }

  const preChartStatus = getEncounterStatus(encounter, "pre-chart");
  const inVisitStatus = getEncounterStatus(encounter, "in-visit");
  let displayStatus = inVisitStatus;
  if (inVisitStatus == "new" && preChartStatus && preChartStatus !== "new") {
    displayStatus = `pre-chart ${preChartStatus}`;
  } else {
    displayStatus = inVisitStatus;
  }
  let color;

  switch (displayStatus) {
    case "inprogress":
      color = "#FF6F00";
      displayStatus = "In Progress";
      break;
    case "pre-chart inprogress":
      color = "#FF6F00";
      displayStatus = "Pre-chart in progress";
      break;
    case "completed":
      color = "#16a878";
      displayStatus = "Completed";
      break;
    case "pre-chart completed":
      color = "#16a878";
      displayStatus = "Pre-chart completed";
      break;
    case "new":
      color = "#5a8dda";
      displayStatus = "Not Started";
      break;
    case "pre-chart summary_inprogress":
      color = "#562e00";
      displayStatus = "Pre-chart generating";
      break;
    default:
      color = "#562e00";
      displayStatus = "Generating";
  }
  return { displayStatus: displayStatus, color: color };
};


export const getEncounterStatus = (encounter, encounterPhase) => {
  let defaultStatus;

  switch (encounterPhase) {
    case "in-visit":
      defaultStatus = encounter?.in_visit_status;
      break;
    case "pre-chart":
      defaultStatus = encounter?.pre_chart_status;
      break;
    case "after-visit":
      defaultStatus = encounter?.after_visit_status;
      break;
  }
  return defaultStatus;
};

export const dataSource =[
    {
        "after_visit_status": "new",
        "after_visit_template_id": null,
        "after_visit_template_overrides_id": null,
        "appointment_id": null,
        "cpt_status": "ready",
        "created_at": "2024-11-08T11:21:16.643217+00:00",
        "created_by": "tushar@insighthealth.ai",
        "description": "Stomach ache - 10 days 11/8 5:00 pm",
        "encounter_id": "b20807f9-5869-4f16-b6c7-401ea0cf532a",
        "encounter_status": "completed",
        "icd_10_status": "inprogress",
        "in_visit_status": "completed",
        "in_visit_template_id": null,
        "in_visit_template_overrides_id": "68c1262e-3488-45e9-9361-3701894cb54e",
        "last_modified_by": "celery",
        "patient_id": null,
        "practitioner_first_name": "Tushar",
        "practitioner_id": 908,
        "practitioner_last_name": "Gupta",
        "practitioner_name": "Dr. Tushar Gupta",
        "pre_chart_status": "new",
        "pre_chart_template_id": null,
        "pre_chart_template_overrides_id": null,
        "start_time": "2024-11-08T11:21:16.154000+00:00",
        "summary_format": "bulleted",
        "summary_verbosity": "comprehensive",
        "type": "ambient",
        "updated_at": "2024-11-08T11:22:22.857480+00:00"
    },
    {
        "after_visit_status": "new",
        "after_visit_template_id": null,
        "after_visit_template_overrides_id": null,
        "appointment_id": null,
        "cpt_status": "pending",
        "created_at": "2024-11-08T11:04:31.201643+00:00",
        "created_by": "tushar@insighthealth.ai",
        "description": "Abdominal Pain - Antibiotics 11/8 4:45 pm",
        "encounter_id": "29f8c6ee-4639-466a-8413-32252f2c1b6d",
        "encounter_status": "completed",
        "icd_10_status": "inprogress",
        "in_visit_status": "completed",
        "in_visit_template_id": null,
        "in_visit_template_overrides_id": "68c1262e-3488-45e9-9361-3701894cb54e",
        "last_modified_by": "celery",
        "patient_id": null,
        "practitioner_first_name": "Tushar",
        "practitioner_id": 908,
        "practitioner_last_name": "Gupta",
        "practitioner_name": "Dr. Tushar Gupta",
        "pre_chart_status": "new",
        "pre_chart_template_id": null,
        "pre_chart_template_overrides_id": null,
        "start_time": "2024-11-08T11:04:30.702000+00:00",
        "summary_format": "bulleted",
        "summary_verbosity": "comprehensive",
        "type": "ambient",
        "updated_at": "2024-11-08T11:05:13.362764+00:00"
    },
    {
        "after_visit_status": "new",
        "after_visit_template_id": null,
        "after_visit_template_overrides_id": null,
        "appointment_id": null,
        "cpt_status": "pending",
        "created_at": "2024-11-08T10:20:43.209722+00:00",
        "created_by": "abhinav@insighthealth.ai",
        "description": "Sharp Right-Sided Pain 11/8 4:00 pm",
        "encounter_id": "a2c6c403-520d-4d6f-8e1f-8c5e10963e09",
        "encounter_status": "completed",
        "icd_10_status": "inprogress",
        "in_visit_status": "completed",
        "in_visit_template_id": null,
        "in_visit_template_overrides_id": "e2c1dfd2-b6f5-4fae-aa36-e79320bdbfc6",
        "last_modified_by": "celery",
        "patient_id": null,
        "practitioner_first_name": "Abhinav",
        "practitioner_id": 146,
        "practitioner_last_name": "Ittekot",
        "practitioner_name": "Dr. Abhinav Ittekot",
        "pre_chart_status": "new",
        "pre_chart_template_id": null,
        "pre_chart_template_overrides_id": null,
        "start_time": "2024-11-08T10:20:42.266000+00:00",
        "summary_format": "bulleted",
        "summary_verbosity": "comprehensive",
        "type": "ambient",
        "updated_at": "2024-11-08T10:23:14.556342+00:00"
    },
    {
        "after_visit_status": "new",
        "after_visit_template_id": null,
        "after_visit_template_overrides_id": null,
        "appointment_id": null,
        "cpt_status": "pending",
        "created_at": "2024-11-08T10:09:40.667819+00:00",
        "created_by": "raja.mohamed@corvanta.io",
        "description": "Encounter - 11/8 3:45 pm",
        "encounter_id": "217bd46c-8b51-4118-8843-ff3bba76e62f",
        "encounter_status": "inprogress",
        "icd_10_status": "pending",
        "in_visit_status": "inprogress",
        "in_visit_template_id": "c7fafe8f-04a6-4522-926f-cc88bba17d25",
        "in_visit_template_overrides_id": null,
        "last_modified_by": "raja.mohamed@corvanta.io",
        "patient_id": null,
        "practitioner_first_name": "Raja",
        "practitioner_id": 147,
        "practitioner_last_name": "Mohamed",
        "practitioner_name": "Dr. Raja Mohamed",
        "pre_chart_status": "new",
        "pre_chart_template_id": null,
        "pre_chart_template_overrides_id": null,
        "start_time": "2024-11-08T10:09:40.181000+00:00",
        "summary_format": "prose",
        "summary_verbosity": "comprehensive",
        "type": "ambient",
        "updated_at": "2024-11-08T10:10:06.236374+00:00"
    },
    {
        "after_visit_status": "new",
        "after_visit_template_id": null,
        "after_visit_template_overrides_id": null,
        "appointment_id": null,
        "cpt_status": "ready",
        "created_at": "2024-11-08T08:33:51.748967+00:00",
        "created_by": "tushar@insighthealth.ai",
        "description": "Stomachache - 10 days 11/8 2:15 pm",
        "encounter_id": "4b8558bf-aac3-42d6-8032-ef424c505a53",
        "encounter_status": "completed",
        "icd_10_status": "inprogress",
        "in_visit_status": "completed",
        "in_visit_template_id": null,
        "in_visit_template_overrides_id": "68c1262e-3488-45e9-9361-3701894cb54e",
        "last_modified_by": "celery",
        "patient_id": null,
        "practitioner_first_name": "Tushar",
        "practitioner_id": 908,
        "practitioner_last_name": "Gupta",
        "practitioner_name": "Dr. Tushar Gupta",
        "pre_chart_status": "new",
        "pre_chart_template_id": null,
        "pre_chart_template_overrides_id": null,
        "start_time": "2024-11-08T08:33:51.238000+00:00",
        "summary_format": "bulleted",
        "summary_verbosity": "comprehensive",
        "type": "ambient",
        "updated_at": "2024-11-08T08:35:03.677295+00:00"
    }
]