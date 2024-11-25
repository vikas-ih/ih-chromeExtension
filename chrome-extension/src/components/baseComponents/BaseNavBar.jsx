import React from "react";
import { ScheduleOutlined, SettingOutlined } from "@ant-design/icons";

import { AmbientMblHoverIcon, AmbientMblIcon } from "../../icons";
import { useDispatch } from "react-redux";
import { setMobileRecord } from "../../store/slice/encounter.slice";
import { NavLink } from "react-router-dom";

const BaseNavBar = () => {
  const dispatch = useDispatch();

  const nullSelectedRecord = () => {
    dispatch(setMobileRecord(false));
  };


  return (
    <nav className="bottom-menu fixed z-[100] h-[4rem] bottom-0 left-0 right-0 bg-white rounded-t-xl px-0">
      <ul className="flex justify-between items-center h-full">
        <li className="flex-grow flex-shrink-0 w-1/3">
          <NavLink
            to="/mobileAppointments"
            className="flex flex-col items-center justify-center "
            style={{ textDecoration: "none" }}
          >
            <div className="menu-text text-xs sm:text-sm">
              <ScheduleOutlined
                className={`${
                  location.pathname === "/mobileAppointments"
                    ? "active-icon mb-2 h-4 w-4"
                    : "mb-2"
                }`}
                onClick={nullSelectedRecord}
               style={{width:"44px",height:"44px"}}
              />
              Appointments
            </div>
          </NavLink>
        </li>

        <li className="flex-grow flex-shrink-0 w-1/3">
          <NavLink
            to="/"
            className="flex flex-col items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            <div className="menu-text text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              {location.pathname.includes("/") ? (
                <div
                  className={`${
                    location.pathname === "/encounters"
                      ? "active-icon mb-2"
                      : "mb-2"
                  }`}
                  onClick={nullSelectedRecord}
                >
                  <AmbientMblHoverIcon />
                </div>
              ) : (
                <div
                  className={`${
                    location.pathname === "/" ? "active-icon mb-2" : "mb-2"
                  }`}
                  onClick={nullSelectedRecord}
                >
                  <AmbientMblIcon />
                </div>
              )}
              Aura AI Scribe
            </div>
          </NavLink>
        </li>
        {/* <li className="flex-grow flex-shrink-0 w-1/3">
          <NavLink
            to={
              location.pathname === "/appointments"
                ? "/appointmentsettings"
                : "/setting"
            }
            className="flex flex-col items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            <div className="menu-text text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              <SettingOutlined
                className={` ${
                  location.pathname === "/appointmentsettings" ||
                  location.pathname === "/setting"
                    ? "active-icon mb-2"
                    : "mb-4"
                }`}
                onClick={nullSelectedRecord}
              />
              {location.pathname === "/appointments" ||
              location.pathname === "/appointmentsettings"
                ? "Admin Settings"
                : "Customize"}
            </div>
          </NavLink>
        </li> */}
      </ul>
      {/* <div className="flex flex-col gap-3 justify-center fixed bottom-24 left-4 z-[101]">
        {showProTrialCountDown && <ProTrialCountDown mobile />}
        {hasInviteUserAccess && <InviteFlow mobile />}
      </div> */}
    </nav>
  );
};

export default BaseNavBar;
