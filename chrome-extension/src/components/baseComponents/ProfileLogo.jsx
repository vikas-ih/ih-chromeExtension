import React, { useEffect, useState } from "react";
import { classNames, profileName } from "../../utilities";
import { Image } from "./Image";
// import { useSelector } from "react-redux";

export const ProfileLogo = ({
  base64Image = null,
  name = "? ?",
  className,
}) => {
  const generateLighterColor = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const lighterR = Math.round((r + 255) / 2.2);
    const lighterG = Math.round((g + 255) / 2.2);
    const lighterB = Math.round((b + 255) / 2.2);
    const lighterColor =
      "#" +
      lighterR.toString(16).padStart(2, "0") +
      lighterG.toString(16).padStart(2, "0") +
      lighterB.toString(16).padStart(2, "0");
    return lighterColor;
  };

  const generateColor = (practitionerName) => {
    const primaryHash = hashCode(practitionerName);
    const secondaryHash = hashCode(practitionerName + "secondary");
    const tertiaryHash = primaryHash ^ secondaryHash;
    let color = "#" + intToRGB(tertiaryHash);
    const lighterColor = generateLighterColor(color);
    return lighterColor;
  };

  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const intToRGB = (i) => {
    const c = (i & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  };
//   const { encounterList } = useSelector((state) => state?.encounterState);
  const encounterList=[
    {
      after_visit_status: "new",
      after_visit_template_id: null,
      after_visit_template_overrides_id: null,
      appointment_id: null,
      cpt_status: "ready",
      created_at: "2024-11-08T11:21:16.643217+00:00",
      created_by: "tushar@insighthealth.ai",
      description: "Stomach ache - 10 days 11/8 5:00 pm",
      encounter_id: "b20807f9-5869-4f16-b6c7-401ea0cf532a",
      encounter_status: "completed",
      icd_10_status: "inprogress",
      in_visit_status: "completed",
      in_visit_template_id: null,
      in_visit_template_overrides_id: "68c1262e-3488-45e9-9361-3701894cb54e",
      last_modified_by: "celery",
      patient_id: null,
      practitioner_first_name: "Tushar",
      practitioner_id: 908,
      practitioner_last_name: "Gupta",
      practitioner_name: "Dr. Tushar Gupta",
      pre_chart_status: "new",
      pre_chart_template_id: null,
      pre_chart_template_overrides_id: null,
      start_time: "2024-11-08T11:21:16.154000+00:00",
      summary_format: "bulleted",
      summary_verbosity: "comprehensive",
      type: "ambient",
      updated_at: "2024-11-08T11:22:22.857480+00:00",
    },
    {
      after_visit_status: "new",
      after_visit_template_id: null,
      after_visit_template_overrides_id: null,
      appointment_id: null,
      cpt_status: "pending",
      created_at: "2024-11-08T11:04:31.201643+00:00",
      created_by: "tushar@insighthealth.ai",
      description: "Abdominal Pain - Antibiotics 11/8 4:45 pm",
      encounter_id: "29f8c6ee-4639-466a-8413-32252f2c1b6d",
      encounter_status: "completed",
      icd_10_status: "inprogress",
      in_visit_status: "completed",
      in_visit_template_id: null,
      in_visit_template_overrides_id: "68c1262e-3488-45e9-9361-3701894cb54e",
      last_modified_by: "celery",
      patient_id: null,
      practitioner_first_name: "Tushar",
      practitioner_id: 908,
      practitioner_last_name: "Gupta",
      practitioner_name: "Dr. Tushar Gupta",
      pre_chart_status: "new",
      pre_chart_template_id: null,
      pre_chart_template_overrides_id: null,
      start_time: "2024-11-08T11:04:30.702000+00:00",
      summary_format: "bulleted",
      summary_verbosity: "comprehensive",
      type: "ambient",
      updated_at: "2024-11-08T11:05:13.362764+00:00",
    },
    {
      after_visit_status: "new",
      after_visit_template_id: null,
      after_visit_template_overrides_id: null,
      appointment_id: null,
      cpt_status: "pending",
      created_at: "2024-11-08T10:20:43.209722+00:00",
      created_by: "abhinav@insighthealth.ai",
      description: "Sharp Right-Sided Pain 11/8 4:00 pm",
      encounter_id: "a2c6c403-520d-4d6f-8e1f-8c5e10963e09",
      encounter_status: "completed",
      icd_10_status: "inprogress",
      in_visit_status: "completed",
      in_visit_template_id: null,
      in_visit_template_overrides_id: "e2c1dfd2-b6f5-4fae-aa36-e79320bdbfc6",
      last_modified_by: "celery",
      patient_id: null,
      practitioner_first_name: "Abhinav",
      practitioner_id: 146,
      practitioner_last_name: "Ittekot",
      practitioner_name: "Dr. Abhinav Ittekot",
      pre_chart_status: "new",
      pre_chart_template_id: null,
      pre_chart_template_overrides_id: null,
      start_time: "2024-11-08T10:20:42.266000+00:00",
      summary_format: "bulleted",
      summary_verbosity: "comprehensive",
      type: "ambient",
      updated_at: "2024-11-08T10:23:14.556342+00:00",
    },
    {
      after_visit_status: "new",
      after_visit_template_id: null,
      after_visit_template_overrides_id: null,
      appointment_id: null,
      cpt_status: "pending",
      created_at: "2024-11-08T10:09:40.667819+00:00",
      created_by: "raja.mohamed@corvanta.io",
      description: "Encounter - 11/8 3:45 pm",
      encounter_id: "217bd46c-8b51-4118-8843-ff3bba76e62f",
      encounter_status: "inprogress",
      icd_10_status: "pending",
      in_visit_status: "inprogress",
      in_visit_template_id: "c7fafe8f-04a6-4522-926f-cc88bba17d25",
      in_visit_template_overrides_id: null,
      last_modified_by: "raja.mohamed@corvanta.io",
      patient_id: null,
      practitioner_first_name: "Raja",
      practitioner_id: 147,
      practitioner_last_name: "Mohamed",
      practitioner_name: "Dr. Raja Mohamed",
      pre_chart_status: "new",
      pre_chart_template_id: null,
      pre_chart_template_overrides_id: null,
      start_time: "2024-11-08T10:09:40.181000+00:00",
      summary_format: "prose",
      summary_verbosity: "comprehensive",
      type: "ambient",
      updated_at: "2024-11-08T10:10:06.236374+00:00",
    },
    {
      after_visit_status: "new",
      after_visit_template_id: null,
      after_visit_template_overrides_id: null,
      appointment_id: null,
      cpt_status: "ready",
      created_at: "2024-11-08T08:33:51.748967+00:00",
      created_by: "tushar@insighthealth.ai",
      description: "Stomachache - 10 days 11/8 2:15 pm",
      encounter_id: "4b8558bf-aac3-42d6-8032-ef424c505a53",
      encounter_status: "completed",
      icd_10_status: "inprogress",
      in_visit_status: "completed",
      in_visit_template_id: null,
      in_visit_template_overrides_id: "68c1262e-3488-45e9-9361-3701894cb54e",
      last_modified_by: "celery",
      patient_id: null,
      practitioner_first_name: "Tushar",
      practitioner_id: 908,
      practitioner_last_name: "Gupta",
      practitioner_name: "Dr. Tushar Gupta",
      pre_chart_status: "new",
      pre_chart_template_id: null,
      pre_chart_template_overrides_id: null,
      start_time: "2024-11-08T08:33:51.238000+00:00",
      summary_format: "bulleted",
      summary_verbosity: "comprehensive",
      type: "ambient",
      updated_at: "2024-11-08T08:35:03.677295+00:00",
    },
  ];
  const [encounterListWithColors, setEncounterListWithColors] = useState(() => {
    // Initial state with a generated color for the given name
    const initialColors = {};
    initialColors[name] = generateColor(name);
    return initialColors;
  });
  const [imgError, setImgError] = useState(false);

  // useEffect(() => {
  //   if (encounterList) {
  //     const newEncounterListWithColors = { ...encounterListWithColors };
  //     encounterList.forEach((encounter) => {
  //       const practitionerName = `${encounter.practitioner_first_name} ${encounter.practitioner_last_name}`;
  //       if (practitionerName && !newEncounterListWithColors[practitionerName]) {
  //         const color = generateColor(practitionerName);
  //         newEncounterListWithColors[practitionerName] = color;
  //       }
  //     });
  //     setEncounterListWithColors(newEncounterListWithColors);
  //   }
  // }, [encounterList]);

  return (
    <>
      {base64Image && !imgError ? (
        <div
          className={classNames("profile-picture", className ? className : "")}
        >
          <Image
            className=""
            src={base64Image}
            alt="user"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div
          className={classNames(
            "profile-picture-name flex justify-center items-center",
            className ? className : ""
          )}
          style={{
            background: encounterListWithColors[name] || generateColor(name),
          }}
        >
          {name && profileName(name)}
        </div>
      )}
    </>
  );
};
