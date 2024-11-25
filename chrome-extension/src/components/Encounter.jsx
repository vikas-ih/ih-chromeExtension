import { useEffect, useState } from "react";

import { EncounterTable } from "./baseComponents/EncounterTable";
import {
  dataSource,
  formatEncounterStatus,
  getEncounterStatus,
} from "../utilities/columns";
import { ProfileLogo } from "./baseComponents/ProfileLogo";
import {
  Dropdown as AntDropdown,
  Input,
  Pagination,
  Tooltip,
  Segmented,
} from "antd";
import { CloseAiIcon, EditableIcon, UpdateIcon } from "../icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  createEncounter,
  encounterDetailsSlice,
  listEncounters,
  mobileViewStatusSlice,
  newEncounterfromMicSlice,
  selectedEncounterSlice,
  setMobileRecord,
  updateEncounter,
} from "../store/slice/encounter.slice";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
// import { getAuthHeaders } from "../store/apiConfig";
import { LoadingBar } from "./baseComponents/LoadingBar";
import { showToastError } from "../utilities/errortoast";
import { ActionsDropdown } from "./baseComponents/ActionDropdown";
import { getFromStorage, storeInLocal } from "../lib/storage";
import { useNavigate } from "react-router-dom";
import EncounterTopNavBar from "./baseComponents/EncounterTopNavBar";
import { MicroPhone } from "../icons/Microphone.icon";
import { listPractitioners } from "../store/actions/practitioner.action";
import { getAllPractitionersNames, getRecentSearchAction } from "../store/actions/appointment.action";
import "./PastEncounter.scss"
const Encounter = ({ schedulepage = false }) => {
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const [editingRow, setEditingRow] = useState("");
  const [storedParams, setStoredParams] = useState("");
  const [editInputOpen, setEditInputOpen] = useState(false);
  const [encounterPhase, setEncounterPhase] = useState("in-visit");
  const [encounterStatus, setEncounterStatus] = useState("");
  const [record, setRecord] = useState("");
  const navigate = useNavigate();
  const refreshInterval = 100000;
  const dispatch = useDispatch();

  const { encounterList, isEncounterListLoading, error, encounterListCount } =
    useSelector((state) => state.encounters);

  const { currentPractitioner } = useSelector(
    (state) => state?.practitionerState
  );
  const { isMobileRecord, newEncounterfromMic } = {
    isMobileRecord: false,
    newEncounterfromMic: false,
  };
  const isMobileView = window.innerWidth <= 1260;

  const savedStartDate_Storage = localStorage.getItem(
    `${currentPractitioner?.org_uuid}_startDate`
  );
  const savedEndDate_Storage = localStorage.getItem(
    `${currentPractitioner?.org_uuid}_endDate`
  );

  const [savedStartDate, setSavedStartDate] = useState(
    savedStartDate_Storage ? savedStartDate_Storage : null
  );
  const [savedEndDate, setSavedEndDate] = useState(
    savedEndDate_Storage ? savedEndDate_Storage : null
  );

  const [selectedEncounter, setSelectedEncounter] = useState("");
  const handleDescriptionChange = (e, record) => {
    const updatedEncounter = { ...record, description: e.target.value };
    setEditingRow(updatedEncounter);
  };

  const practitioner_id = currentPractitioner?.practitioner_id;

  const savedPractitioner_ID = getFromStorage(
    `${currentPractitioner?.org_uuid}_storePractitioner`
  );

  const [selectedPractitioner, setSelectedPractitioner] = useState(
    savedPractitioner_ID !== ""
      ? parseInt(savedPractitioner_ID)
      : practitioner_id
  );

  const [sortState, setSortState] = useState({
    field: "created_at",
    order: "desc",
  });

  const [browserTimezone, setBrowserTimezone] = useState("");
  const [utcTime, setUtcTime] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setCurrentPage] = useState(1);
  const [pageSize, setCurrentPageSize] = useState(5);

  const storeSavedTabMobile = getFromStorage(
    `${currentPractitioner?.org_uuid}_selectedTab`
  );

  const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  const lastweek = moment().subtract(7, "days").format("YYYY-MM-DD");

  const [selectedTabDate, setSelectedTabDate] = useState(today);
  const [selectedLastWeek, setSelectedLastWeek] = useState(
    storeSavedTabMobile === "Last week" ? "Last week" : null
  );

  const [selectedTab, setSelectedTab] = useState(
    storeSavedTabMobile ? storeSavedTabMobile : "Today"
  );

  const [pageState, setPageState] = useState({
    current: 1,
    pageSize: 5,
  });

  const [resetDateFilter, setResetDateFilter] = useState(false);
  const [isResetFiltersOn, setIsResetFiltersOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    storeSavedTabMobile
      ? storeSavedTabMobile
      : localStorage.getItem(`${currentPractitioner?.org_uuid}_selectedFilter`)
      ? localStorage.getItem(`${currentPractitioner?.org_uuid}_selectedFilter`)
      : "Today"
  );

  const [selectedFilter, setSelectedFilter] = useState(() => {
    const storedFilter = localStorage.getItem(
      `${currentPractitioner?.org_uuid}_selectedFilter`
    );
    return storedFilter == null ? "Loading..." : storedFilter || "Today";
  });

  const handleMobileRowClick = (record) => {
    dispatch(encounterDetailsSlice(record));
    storeInLocal("uuid", record?.appt_uuid);
    dispatch(setMobileRecord(true));
    dispatch(mobileViewStatusSlice(record));
    setSelectedTab("Today");
    setSelectedLastWeek(null);
    navigate(`/mobileEncounterDetails/${record?.encounter_id}`);
    setSelectedTabDate(today);
    setPageState({
      current: 1,
      pageSize: 10,
    });
  };

  const handleSaveDescription = (record) => {
    const params = {
      ...storedParams,
    };
    if (!editingRow.description.trim()) {
      showToastError("Description cannot be empty!");
      return;
    }

    dispatch(
      updateEncounter({
        encounter_id: record.encounter_id, // Set the encounter_id key explicitly
        encounterPhase: encounterPhase,
        data: { description: editingRow.description },
        params: params,
        showToastMessage: true,
        accessToken: accessToken,
      })
    );
    setEditingRow(null);
  };

  const pageHandler = (current, pageSize) => {
    setPageState({ current, pageSize });
  };

  const changeEncounterStatus = (encounter_id) => {
    const currentEncounter =
      encounterList &&
      encounterList?.find(
        (encounter) => encounter?.encounter_id === encounter_id
      );
    if (currentEncounter) {
      setEncounterStatus(getEncounterStatus(currentEncounter, encounterPhase));
    }
  };

    // Function to request microphone permissions
    const requestMicPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log("Microphone access granted.");
        // Stop the stream to release the microphone
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    };

   
  const [searchFilters, setSearchFilters] = useState({
    status: "",
    page: page,
    per_page: pageSize,
    sort_by: "created_at",
    sort_direction: "desc",
    // created_at_gt: "2024-11-08T00:00:00+05:30",
    // created_at_lt: "2024-11-08T23:59:59+05:30",
  });
  useEffect(() => {
    // const searchFilters =
    // // const headers = getAuthHeaders(accessToken);
    setStoredParams(searchFilters);
    dispatch(listEncounters({ searchFilters, accessToken }));
  }, [dispatch, page]);


   useEffect(() => {
     requestMicPermission();
   }, []);
  const columns = [
    {
      title: (
        <div className="flex items-center">
          {encounterList?.length > 0 ? "" : ""}
        </div>
      ),
      dataIndex: "description",
      key: "description",
      width: "20%",
      render: (text, record) => {
        const { color, displayStatus } = formatEncounterStatus(record);

        return (
          <>
            {" "}
            <div className="flex w-full items-center">
              <ProfileLogo
                name={`${record.practitioner_first_name} ${record.practitioner_last_name}`}
                className={"profile-popover-logo mr-1 sm:mr-2 lg:mr-3"}
                practitioner_name={record?.practitioner_name}
                practitioner_id={record?.practitioner_id}
              />
              <div className="flex-grow p-2">
                {editingRow?.encounter_id === record.encounter_id ? (
                  <div className="flex items-center gap-3  w-full">
                    <Input
                      className="edit-input"
                      style={{
                        width: "100%",
                        background: "#ffffff",
                        border: "1px solid #00d090",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        borderRadius: "5px",
                        padding: "5px 12px",
                      }}
                      defaultValue={editingRow?.description}
                      onChange={(e) => handleDescriptionChange(e, record)}
                    />
                    <div
                      className="bg-[#00d091] rounded-full flex items-center justify-center p-1"
                      style={{ padding: "4px" }}
                    >
                      <UpdateIcon
                        onClick={() => {
                          handleSaveDescription(editingRow, storedParams);
                          setEditInputOpen(false);
                        }}
                      />
                    </div>
                    <div
                      className="bg-[#d63232] rounded-full flex items-center justify-center "
                      style={{ padding: "4px" }}
                    >
                      <CloseAiIcon
                        stroke="#ffffff"
                        fill="#ffffff"
                        className=""
                        onClick={() => {
                          setEditInputOpen(false);
                          setEditingRow(null);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-[13px] font-medium flex gap-3">
                    {text}
                  </div>
                )}

                <div className="text-gray-500 text-[12px] flex flex-col">
                  <div className="" style={{ color }}>
                    {displayStatus}
                  </div>
                  <div className="flex">{record.practitioner_name}</div>
                  <div>
                    {moment(record.created_at).format("MMM Do, YYYY")}{" "}
                    {moment(record.created_at).format("h:mm A")}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
      onCell: (record) => ({
        onClick: () => {
          if (!newEncounterfromMic) {
            setEncounterStatus(getEncounterStatus(record, encounterPhase));
            setRecord(record);
          }
          editInputOpen ? null : handleMobileRowClick(record);
        },
      }),
    },
    {
      title: " ",
      key: "actions",
      width: "5%",
      render: (text, record) => (
        <div className="gap-4">
          <div>
            <div className="flex gap-4 justify-end">
              <span>
                <Tooltip title="Edit Name" placement="topLeft">
                  <div className="">
                    <EditableIcon
                      onClick={() => {
                        setEditInputOpen(true);
                        setEditingRow(record);
                      }}
                    />
                  </div>
                </Tooltip>
              </span>
              <span>
                <Tooltip title="Remove Encounter" placement="topRight">
                  <div className="">
                    <ActionsDropdown
                      encounterDetailsSlice={record}
                      searchFilters={searchFilters}
                      record={record}
                      storedParams={storedParams}
                      accessToken={accessToken}
                    />
                  </div>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  //Function to store and reset selected tab dates in mobile view
  const handleTabChange = (key) => {
    storeInLocal(`${currentPractitioner?.org_uuid}_selectedTab`, key);
    setPageState({
      current: 1,
      pageSize: 10,
    });
    setSelectedTab(key);
    if (key === "Yesterday") {
      setSelectedTabDate(yesterday);
      setSelectedLastWeek(null);
    } else if (key === "Today") {
      setSelectedTabDate(today);
      setSelectedLastWeek(null);
    } else if (key === "Last week") {
      setSelectedTabDate(today);
      setSelectedLastWeek(lastweek);
    } else {
      setSelectedTabDate("All time");
      setSelectedLastWeek(null);
    }
  };
  //Reset functionality
  const resetFilters = () => {
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_startDateRange`);
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDateRange`);
    localStorage.removeItem(
      `${currentPractitioner?.org_uuid}_storePractitioner`
    );
    localStorage.removeItem(
      `${currentPractitioner?.org_uuid}_selectedTitleEncounter`
    );
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedSearch`);
    localStorage.removeItem(
      `${currentPractitioner?.org_uuid}_selectedPractitioner`
    );
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedTab`);
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedDate`);
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_savedStatus`);
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedDates`);
    // setSelectedTitleEncounter("");
    // analytics.track("Clicked Clear Filters In Aura", {});
    setSavedStartDate && setSavedStartDate(null);
    setSavedEndDate && setSavedEndDate(null);
    setSearchFilters({});
    setSelectedDate("Today");
    setSelectedPractitioner("All");
    setStartDate(null);
    setEndDate(null);
    // setRenameTitleEncounter("");
    setSelectedTab && setSelectedTab("Today");
    setResetDateFilter(true);
    setSelectedFilter("");
    setIsResetFiltersOn(true);
  };

  const roundToNext15Minutes = (localTime) => {
    console.log(
      "Rounding to next 15 minutes, source time:",
      localTime.toISOString()
    );

    const minutes = localTime.minutes();
    const roundedMinutes = Math.ceil(minutes / 15) * 15;

    // Set the rounded minutes and reset seconds/milliseconds
    return localTime.minutes(roundedMinutes).seconds(0).milliseconds(0);
  };
  const handleCreateEncounter = async (practitionerId, customOptions = {}) => {
    console.log("store", storedParams);
    const { description, callback, demo } = {
      description: null,
      ...customOptions,
    };
    setSearchFilters("");
    storeInLocal(
      `${currentPractitioner?.org_uuid}_storePractitioner`,
      practitionerId
    );
    dispatch(newEncounterfromMicSlice(true));
    dispatch(encounterDetailsSlice(null));
    setSelectedDate("Today");
    setSelectedTab && setSelectedTab("Today");
    setStartDate(null);
    setEndDate(null);
    // Create a new encounter
    const current_date = moment().local();
    const roundedDate = roundToNext15Minutes(current_date);
    const formattedDate = `${current_date.month() + 1}/${current_date.date()}`;
    const defaultDescription =
      description ||
      `Encounter - ${formattedDate} ${roundedDate.format("h:mm a")}`;
    const data = {
      description: defaultDescription,
      practitioner_id:
        !isMobileView && !schedulepage
          ? practitionerId
          : !isMobileView && schedulepage
          ? currentPractitioner.practitioner_id
          : currentPractitioner.practitioner_id,
      start_time: moment().local().toISOString(),
    };

    if (schedulepage && appointmentId) {
      data.appointment_id = appointmentId;
    }

    dispatch(selectedEncounterSlice(null));
    setSelectedTab("Today");
    setSelectedLastWeek(null);
    setSelectedTabDate(today);

    //  const trackEvents = () => {
    //    if (demo) {
    //      analytics.track("Created New Ambient Encounter From Retry Demo", {
    //        mobile: isMobileView,
    //      });
    //      return;
    //    }

    //    if (schedulepage) {
    //      analytics.track("Created New Ambient Encounter From VCA", {});
    //    } else {
    //      analytics.track("Created New Ambient Encounter From Aura", {});
    //    }
    //  };

    const desktopCallback = (createdEncounter) => {
      trackEvents();
      setRecord(createdEncounter);
      setEncounterStatus(createdEncounter.status);
      setPageState({
        current: 1,
        pageSize: 10,
      });
      changeEncounterStatus(record?.encounter_id);
      callback?.(createdEncounter);
    };
    const mobileCallback = (createdEncounter) => {
      //  trackEvents();

      // IMPORTANT: in mobile do not redirect when callback is provided to avoid unmounting the whole component
      if (callback) {
        callback(createdEncounter);
      } else {
        navigate(`/mobileEncounterDetails/${createdEncounter.encounter_id}`);
      }
    };

    if (isMobileView) {
      setEncounterStatus("");
      dispatch(
        createEncounter({ data, callback: mobileCallback, accessToken })
      );
    } else {
      dispatch(
        createEncounter({ data, callback: mobileCallback, accessToken })
      );
    }
  };

  //Triggers initial api call to list encounters
  useEffect(() => {
    let params = {
      ...searchFilters,
      practitioner_id:
        selectedPractitioner && selectedPractitioner
          ? selectedPractitioner
          : practitioner_id,
      page: pageState.current,
      per_page: pageState.pageSize,
    };

    if (sortState.field) {
      params.sort_by = sortState.field;
      params.sort_direction = sortState.order;
    }

    if (
      selectedDate === "Custom…🗓️" &&
      startDate &&
      endDate &&
      !isMobileView &&
      !schedulepage
    ) {
      params.created_at_gt = moment(startDate)
        .startOf("day")
        .tz(moment.tz.guess())
        .format();
      params.created_at_lt = moment(endDate)
        .endOf("day")
        .tz(moment.tz.guess())
        .format();
    } else if (selectedDate === "Today" && !isMobileView && !schedulepage) {
      params.created_at_gt = moment()
        .startOf("day")
        .tz(moment.tz.guess())
        .format();
      params.created_at_lt = moment()
        .endOf("day")
        .tz(moment.tz.guess())
        .format();
    } else if (selectedDate === "Yesterday" && !isMobileView && !schedulepage) {
      params.created_at_gt = moment()
        .subtract(1, "days")
        .startOf("day")
        .tz(moment.tz.guess())
        .format();
      params.created_at_lt = moment()
        .subtract(1, "days")
        .endOf("day")
        .tz(moment.tz.guess())
        .format();
    } else if (selectedDate === "Last week" && !isMobileView && !schedulepage) {
      params.created_at_gt = moment()
        .subtract(1, "weeks")
        .startOf("isoWeek")
        .tz(moment.tz.guess())
        .format();
      params.created_at_lt = moment()
        .subtract(1, "weeks")
        .endOf("isoWeek")
        .tz(moment.tz.guess())
        .format();
    } else if (isMobileView && !schedulepage && selectedLastWeek === null) {
      if (selectedTab === "Today") {
        params.created_at_gt = moment()
          .startOf("day")
          .tz(moment.tz.guess())
          .format();
        params.created_at_lt = moment()
          .endOf("day")
          .tz(moment.tz.guess())
          .format();
      } else if (selectedTab === "Yesterday") {
        params.created_at_gt = moment()
          .subtract(1, "days")
          .startOf("day")
          .tz(moment.tz.guess())
          .format();
        params.created_at_lt = moment()
          .subtract(1, "days")
          .endOf("day")
          .tz(moment.tz.guess())
          .format();
      }
    } else if (isMobileView && selectedLastWeek && !schedulepage) {
      params.created_at_gt = moment()
        .subtract(1, "weeks")
        .startOf("isoWeek")
        .tz(moment.tz.guess())
        .format();
      params.created_at_lt = moment()
        .subtract(1, "weeks")
        .endOf("isoWeek")
        .tz(moment.tz.guess())
        .format();
    } else if (savedStartDate && savedEndDate) {
      params.created_at_gt = savedStartDate;
      params.created_at_lt = savedEndDate;
    } else if (isMobileView && !schedulepage) {
      if (storeSavedTabMobile === "Today") {
        params.created_at_gt = moment()
          .startOf("day")
          .tz(moment.tz.guess())
          .format();
        params.created_at_lt = moment()
          .endOf("day")
          .tz(moment.tz.guess())
          .format();
      } else if (storeSavedTabMobile === "Yesterday") {
        params.created_at_gt = moment()
          .subtract(1, "days")
          .startOf("day")
          .tz(moment.tz.guess())
          .format();
        params.created_at_lt = moment()
          .subtract(1, "days")
          .endOf("day")
          .tz(moment.tz.guess())
          .format();
      } else if (storeSavedTabMobile === "Last week") {
        params.created_at_gt = moment()
          .subtract(1, "weeks")
          .startOf("isoWeek")
          .tz(moment.tz.guess())
          .format();
        params.created_at_lt = moment()
          .subtract(1, "weeks")
          .endOf("isoWeek")
          .tz(moment.tz.guess())
          .format();
      } else if (storeSavedTabMobile === "All time") {
        params.created_at_gt = "";
        params.created_at_lt = "";
      }
    }

    if (params.practitioner_id === "All") {
      delete params.practitioner_id;
    }

    // If opening in combo view, we don't want to pass any other param apart from appointment_id
    // if (schedulepage) {
    //   params = {
    //     appointment_id: appointmentId,
    //   };
    // }
    dispatch(listEncounters({ searchFilters: params, accessToken }));
    setStoredParams(params);

    // const intervalId = setInterval(() => {
    //   if (!isMagicEditingRef.current) {
    //     dispatch(listEncounters(params, false));
    //   }
    // }, refreshInterval);

    // return () => clearInterval(intervalId);
  }, [
    utcTime,
    searchFilters,
    sortState,
    pageState,
    startDate,
    endDate,
    selectedTabDate,
    selectedLastWeek,
    selectedTab,
    selectedDate,
    selectedPractitioner,
    savedStartDate,
    savedEndDate,
  ]);

  //Function to add timestamp to selected date in mobile view
  useEffect(() => {
    const convertToUTC = () => {
      if (browserTimezone) {
        const currentTime = moment().tz(browserTimezone);
        const utcTime = currentTime.clone().utc();
        const utcTimeString = utcTime.format("HH:mm");
        const offset = currentTime.utcOffset();
        const sign = offset >= 0 ? "+" : "-";
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const formattedOffset = `${sign}${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        const formattedUtcTime = `${utcTimeString}${formattedOffset}`;
        setUtcTime(formattedUtcTime);
      }
    };

    convertToUTC();
  }, [browserTimezone]);

  const payload = {
    is_new_appointment: true,
  };


   useEffect(() => {
     dispatch(listPractitioners(accessToken));
     dispatch(getAllPractitionersNames(payload,accessToken));
     dispatch(getRecentSearchAction("encounters", accessToken));
   }, [dispatch]);

  return (
    <div className="page-wrapper past flex flex-col relative ">
      <EncounterTopNavBar
        searchFilters={searchFilters}
        page={page}
        setSearchFilters={setSearchFilters}
        handleTabChange={handleTabChange}
        selectedTab={selectedTab}
        storeSavedTabMobile={storeSavedTabMobile}
        isEncounterListLoading={isEncounterListLoading}
        resetFilters={resetFilters}
        setPageState={setPageState}
        setIsResetFiltersOn={setIsResetFiltersOn}
        currentPractitioner={currentPractitioner}
        selectedPractitioner={selectedPractitioner}
        setSelectedPractitioner={setSelectedPractitioner}
        changeEncounterStatus={changeEncounterStatus}
        record={record}
      />
      <div className="mb-24 relative ">
        <div
          className={`min-h-screen grid shadow-xl ant-table-wrappers rounded-xl bg-white relative`}
        >
          <EncounterTable
            columns={columns}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setSearchFilters={setSearchFilters}
            // setTopBarInputs={setTopBarInputs}
            onCreateEncounter={() => handleCreateEncounter(storedParams)} //check
            ClassName={"tableai"}
            rowClassName={(record, index) => {
              if (
                selectedEncounter &&
                record?.encounter_id === selectedEncounter?.encounter_id
              ) {
                return "bg-gray-100 shadow-inner transform transition duration-200 ease-in-out hover:shadow-lg cursor-pointer overflow-x-hidden";
              }
              return "";
            }}
            showSorterTooltip={false}
            dataSource={encounterList}
            loading={{
              indicator: <LoadingBar />,
              spinning: isEncounterListLoading,
            }}
            locale={{
              emptyText: "No Data",
            }}
            tableLayout="auto"
            Sorting
            sortDirections={["asc", "desc", "asc"]}
            sortedInfo={sortState}
          />
          <div className="sticky bottom-0 bg-white  flex items-center justify-center ">
            {encounterList.length > 0 && (
              <Pagination
                current={pageState.current}
                pageSize={pageState.pageSize}
                total={encounterListCount}
                onChange={(page, pageSize) => {
                  pageHandler(page, pageSize);
                }}
                className="custom-pagination-class "
                showSizeChanger={false}
                pageSizeOptions={["10", "30", "50", "100"]}
                size="large"
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#00D090] rounded-full w-14 h-14 fixed bottom-20 right-8 flex items-center justify-center">
        <MicroPhone
          onClick={(storedParams) => handleCreateEncounter(storedParams)}
        />
      </div>
    </div>
  );
};

export default Encounter;
