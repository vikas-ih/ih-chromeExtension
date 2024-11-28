

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

