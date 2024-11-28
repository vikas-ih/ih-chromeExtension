import React, { useEffect, useState } from "react";
import { classNames, profileName } from "../../utilities";
import { Image } from "./";
import "./styles.css";
// import { useSelector, useDispatch } from "react-redux";
// import { listEncounters } from "src/modules/ambient_solo/store/actions/encounter";

export const ProfileTopNavbar = ({
  base64Image = null,
  name = "? ?",
  className,
}) => {
  //   const dispatch = useDispatch();
  const isMobileView = window.innerWidth <= 1260;
  //   const { encounterList } = useSelector((state) => state?.encounterState);
  //   const { getAppointmentStatusList } = useSelector(
  //     (state) => state?.appointmentState
  //   );
  //   const { currentPractitioner } = useSelector(
  //     (state) => state?.practitionerState
  //   );
  const [appointmentwithColors, setappointmentwithColors] = useState({});
  const [imgError, setImgError] = useState(false);
  //   const loadedList =
  //     getAppointmentStatusList?.length > 0
  //       ? getAppointmentStatusList
  //       : encounterList?.length > 0
  //       ? encounterList
  //       : null;

  //   useEffect(() => {
  //     const newappointmentwithColors = { ...appointmentwithColors };
  //     if (loadedList?.length > 0) {
  //       loadedList?.forEach((appointment) => {
  //         const name = `${
  //           appointment?.practitioner_firstName
  //             ? appointment?.practitioner_firstName
  //             : appointment?.practitioner_first_name
  //         } ${
  //           appointment?.practitioner_lastName
  //             ? appointment?.practitioner_lastName
  //             : appointment?.practitioner_last_name
  //         }`;
  //         if (name && !newappointmentwithColors[name]) {
  //           const color = generateColor(name);
  //           newappointmentwithColors[name] = color;
  //         }
  //       });
  //     }
  //     setappointmentwithColors(newappointmentwithColors);
  //   }, [getAppointmentStatusList, encounterList, currentPractitioner]);

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

    // Get a lighter version of the color
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
            background:
              appointmentwithColors[name] || generateColor(name || ""),
          }}
        >
          {generateColor(name) && name && profileName(name)}
        </div>
      )}
    </>
  );
};
