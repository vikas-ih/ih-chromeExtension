import { useAuth } from "@frontegg/react";
import { Button, Dropdown, Segmented, Select } from "antd";
import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  AddAiIcon,
  ExpandIcon,
  ManageViewsIcon,
  RecentSearchIcon,
  TagIcon,
} from "../icons";
import { getFromStorage, storeInLocal } from "../lib/storage";
// import { addRecentSearchAction } from "src/store/actions/appointment.action";
// import { showToastSuccess } from "src/utilities/toast";
import { v4 as uuidv4 } from "uuid";
// import { selectedEncounterSlice } from "../../store/slices/encounter";
// import { TreeSelectDropdown } from "../baseComponents";
// import { SelectHover } from "../baseComponents/SelectHover";
// import { SingleSelect } from "../baseComponents/SingleSelect";
// import { EncounterDateFilter } from "./EncounterDateFilter";
// import { ManageSearchEncounterModal } from "./ManageSearchEncounter";
import "./PastEncounter.css";
import { encountersJson } from "../mocks/encounters";
// import { SavedSearchEncounterModal } from "./SaveSearchEncounter";
import moment from "moment";

export const PastEncounterTopBar = (
  {
    //   setSearchFilters,
    //   searchFilters,
    //   setStartDate,
    //   setEndDate,
    //   topBarInputs,
    //   setTopBarInputs,
    //   handleCreateEncounter,
    //   onCreateEncounter,
    //   selectedEncounterDetails,
    //   startDate,
    //   endDate,
    //   setPageState,
    //   selectedPractitioner,
    //   setSelectedPractitioner,
    //   schedulepage,
    //   DateOptions,
    //   handleCancelModal,
    //   modalVisible,
    //   isCustomSelected,
    //   setModalVisible,
    //   selectedDate,
    //   handleDateFilterChange,
    //   setSelectedDate,
    //   practitioner_options,
    //   setEncounterStatus,
    //   record,
    //   changeEncounterStatus,
    //   setRecord,
    //   setSavedStartDate,
    //   setSavedEndDate,
    //   selectedTab,
    //   recentSearchList,
    //   handleTabChange,
    //   setSelectedTab,
    //   handleRowClick,
  }
) => {
  //   const dispatch = useDispatch();
  //   const { currentPractitioner } = useSelector(
  //     (state) => state?.practitionerState
  //   );
  //   const { user } = useAuth();
  //   const [recentSearches, setRecentSearches] = useState([]);
  //   const [isEncounterVisible, setIsEncounterVisible] = useState(false);
  //   const [renameTitleEncounter, setRenameTitleEncounter] = useState("");
  //   const [isMangeViewOpen, setIsMangeViewOpen] = useState(false);
  //   const [duplicateError, setDuplicateError] = useState(false);
  //   const [resetDateFilter, setResetDateFilter] = useState(false);
  //   const [isResetFiltersOn, setIsResetFiltersOn] = useState(false);
  //   const [selectedDates, setSelectedDates] = useState([null, null]);
  //   const [selectedFilter, setSelectedFilter] = useState(() => {
  //     const storedFilter = localStorage.getItem(
  //       `${currentPractitioner?.org_uuid}_selectedFilter`
  //     );
  //     return storedFilter == null ? "Loading..." : storedFilter || "Today";
  //   });
  //   const [hoverStatesEncounter, setHoverStatesEncounter] = useState({
  //     practitionerDropdownEncounter: false,
  //     recentFilterDropdownEncounter: false,
  //   });
  //   const [startDateRange, setStartDateRange] = useState("");
  //   const [endDateRange, setEndDateRange] = useState("");

  //   useEffect(() => {
  //     setStartDateRange(
  //       localStorage.getItem(`${currentPractitioner?.org_uuid}_startDateRange`)
  //     );
  //     setEndDateRange(
  //       localStorage.getItem(`${currentPractitioner?.org_uuid}_endDateRange`)
  //     );
  //   }, [
  //     localStorage.getItem(`${currentPractitioner?.org_uuid}_startDateRange`),
  //     localStorage.getItem(`${currentPractitioner?.org_uuid}_endDateRange`),
  //   ]);

  //   const [selectedTitleEncounter, setSelectedTitleEncounter] = useState(
  //     () =>
  //       localStorage.getItem(
  //         `${currentPractitioner?.org_uuid}_selectedTitleEncounter`
  //       ) || ""
  //   );

  //   const { isMobileRecord } = useSelector((state) => state?.encounterState);

  //   const addRecentSearch = (practitionerId, practitionerName, title, date) => {
  //     const newSearch = {
  //       practitioners: [
  //         {
  //           practitionerId: practitionerId === "All" ? "All" : practitionerId,
  //           practitionerName: practitionerName || "",
  //         },
  //       ],
  //       status: searchFilters?.status ? searchFilters?.status : "",
  //       title: title || "",
  //       date: date || "",
  //       id: uuidv4(),
  //     };
  //     if (recentSearchList?.search_preference?.length > 0) {
  //       // setRecentSearches(prevSearches => [newSearch, ...recentSearchList?.search_preference]);
  //       dispatch(
  //         addRecentSearchAction(
  //           [newSearch, ...recentSearchList?.search_preference],
  //           "encounters"
  //         )
  //       );
  //       showToastSuccess("View saved");
  //     } else {
  //       // setRecentSearches([newSearch]);
  //       dispatch(addRecentSearchAction([newSearch], "encounters"));
  //       showToastSuccess("View saved");
  //     }
  //   };

  //   const handleSaveView = () => {
  //     analytics.track("Clicked Submit After Adding View In Aura Custom Views", {
  //       title: renameTitleEncounter,
  //     });
  //     addRecentSearch(
  //       selectedPractitioner,
  //       options.find((option) => option.value === selectedPractitioner)?.name,
  //       renameTitleEncounter,
  //       isMobileView
  //         ? selectedTab && selectedTab
  //         : selectedFilter === "Yesterday" ||
  //           selectedFilter === "Last week" ||
  //           selectedFilter === "Today" ||
  //           selectedFilter === "All time"
  //         ? selectedFilter
  //         : "All time"
  //     );
  //     setIsEncounterVisible(false);
  //     storeInLocal(
  //       `${currentPractitioner?.org_uuid}_selectedTitleEncounter`,
  //       renameTitleEncounter
  //     );

  //     setDuplicateError(false);
  //   };

  //   const handleMangeViews = () => {
  //     analytics.track("Clicked Manage Views In Aura Custom Views", {});
  //     setIsMangeViewOpen(true);
  //     setHoverStatesEncounter({
  //       practitionerDropdownEncounter: false,
  //       recentFilterDropdownEncounter: false,
  //     });
  //   };

  //   const handleSaveDuplicate = () => {
  //     const existingTitles =
  //       recentSearchList?.search_preference?.map((search) => search.title) || [];
  //     const isDuplicate = existingTitles.includes(renameTitleEncounter.trim());
  //     if (isDuplicate) {
  //       setDuplicateError(true);
  //       return;
  //     }
  //     handleSaveView();
  //   };

  //   const handleCloseManageView = () => {
  //     analytics.track("Clicked Cancel Button In Aura Manage Views Modal", {});
  //     setIsMangeViewOpen(false);
  //   };
  //   const handleRecentSearchSelect = (search) => {
  //     setRenameTitleEncounter("");
  //     const practitionerIds =
  //       search?.practitioners.map((p) => p.practitionerId) || [];
  //     setSearchFilters({
  //       practitioner_id: practitionerIds,
  //       status: search?.status,
  //     });
  //     setSelectedDate(search?.date);
  //     setSelectedDates([null, null]);
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_startDateRange`);
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDateRange`);
  //     setSelectedFilter(search?.date);
  //     setSelectedTab && setSelectedTab(search?.date);
  //     storeInLocal(`${currentPractitioner?.org_uuid}_selectedTab`, search?.date);

  //     const selectedPractitioner = search.practitioners.length
  //       ? search.practitioners[0].practitionerId
  //       : null;
  //     setSelectedPractitioner(selectedPractitioner);
  //     changeEncounterStatus(record?.encounter_id);
  //     storeInLocal(
  //       `${currentPractitioner?.org_uuid}_storePractitioner`,
  //       practitionerIds
  //     );
  //     const recentSearchDateFilter =
  //       search?.date !== "N/A" ? search?.date : "All time";
  //     storeInLocal(
  //       `${currentPractitioner?.org_uuid}_selectedFilter`,
  //       recentSearchDateFilter
  //     );
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedDates`);
  //     search?.status
  //       ? storeInLocal(
  //           `${currentPractitioner?.org_uuid}_savedStatus`,
  //           search?.status
  //         )
  //       : storeInLocal(`${currentPractitioner?.org_uuid}_savedStatus`, "");
  //     if (search?.id && search?.id?.length > 0) {
  //       handleRowClick(search.id[0]);
  //     }
  //   };

  //   useEffect(() => {
  //     const storedPractitioner = getFromStorage(
  //       `${currentPractitioner?.org_uuid}_selectedPractitioner`
  //     );
  //     const storedStatus = getFromStorage(
  //       `${currentPractitioner?.org_uuid}_savedStatus`
  //     );

  //     if (storedPractitioner) {
  //       setSelectedPractitioner(JSON.parse(storedPractitioner));
  //       setSearchFilters((prev) => ({
  //         ...prev,
  //         practitioner_id: JSON.parse(storedPractitioner),
  //         status: storedStatus,
  //       }));
  //     }
  //   }, []);

  //   const handleAddLabel = () => {
  //     analytics.track("Clicked Save This View In Aura Custom Views");
  //     setIsEncounterVisible(true);
  //     setHoverStatesEncounter({
  //       practitionerDropdownEncounter: false,
  //       recentFilterDropdownEncounter: false,
  //     });
  //   };

  //   const handleCloseView = () => {
  //     analytics.track("Clicked Cancel In Aura Save This View Modal");
  //     setIsEncounterVisible(false);
  //     setRenameTitleEncounter("");
  //   };

  //   useEffect(() => {
  //     if (selectedEncounterDetails) {
  //       setTopBarInputs((prevInputs) => ({
  //         ...prevInputs,
  //         description: defaultDescription,
  //       }));
  //     }
  //   }, [selectedEncounterDetails]);

  //   const defaultDescription = selectedEncounterDetails?.description || "";

  //   const isMobileView = window.innerWidth <= 1260;

  //   const { practitionerListLoading, practitionerList } = useSelector(
  //     (state) => state?.practitionerState
  //   );

  //   const options = practitionerList?.map((practitioner, index, array) => {
  //     const practitionersWithSameName = array.filter(
  //       (p) => p.full_name === practitioner.full_name && p !== practitioner
  //     );
  //     const displayEmail = practitionersWithSameName.length > 0;
  //     return {
  //       value: practitioner.practitioner_id,
  //       label: (
  //         <div>
  //           <div>{practitioner.full_name}</div>
  //           {displayEmail && (
  //             <div
  //               style={{
  //                 color: "grey",
  //                 fontSize: "smaller",
  //                 fontFamily: "Poppins",
  //               }}
  //             >
  //               {practitioner.practitioner_email}
  //             </div>
  //           )}
  //         </div>
  //       ),
  //       name: practitioner.full_name,
  //     };
  //   });

  //   const statusOptions = [
  //     {
  //       title: "All",
  //       value: "",
  //       className:
  //         "flex justify-center bg-[#ffffff] items-center h-8 rounded-full hover:bg-[#f7f7f7]",
  //     },
  //     {
  //       title: "Completed",
  //       value: "completed",
  //       className:
  //         "text-[#1ec990] bg-[#eefaf4] h-8 flex items-center justify-center rounded-full hover:bg-[#A2EFC9]",
  //     },
  //     {
  //       title: "In Progress",
  //       value: "inprogress",
  //       className:
  //         "text-[#ff6f00] bg-[#ffe1ca] h-8 flex items-center justify-center rounded-full hover:bg-[#F7CFB1]",
  //     },
  //     {
  //       title: "Not Started",
  //       value: "new",
  //       className:
  //         "text-[#5a8dda] bg-[#e7f1ff] h-8 flex items-center justify-center rounded-full hover:bg-[#BCD4F7]",
  //     },
  //   ];

  //   useEffect(() => {
  //     const savedDateFilter = getFromStorage(
  //       `${currentPractitioner?.org_uuid}_selectedDate`
  //     );

  //     if (savedDateFilter && savedDateFilter !== "undefined") {
  //       setSelectedDate(savedDateFilter);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     storeInLocal(`${currentPractitioner?.org_uuid}_selectedDate`, selectedDate);
  //   }, [selectedDate]);

  //   options?.unshift({ label: "All", value: "All" });

  //   const onFilter = (inputValue, option) => {
  //     if (option && option.name) {
  //       return option.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  //     }
  //     return false;
  //   };

  //   useEffect(() => {
  //     if (!schedulepage) {
  //       setSelectedPractitioner(currentPractitioner?.practitioner_id);
  //     }
  //   }, [currentPractitioner]);

  //   const onChange = (value, option, type) => {
  //     setPageState({
  //       current: 1,
  //       pageSize: 10,
  //     });
  //     dispatch(selectedEncounterSlice(null));

  //     if (type === "practitioner") {
  //       setIsResetFiltersOn(false);
  //       analytics.track("Selected Practitioner Filter Option In Aura");
  //       value &&
  //         storeInLocal(
  //           `${currentPractitioner?.org_uuid}_storePractitioner`,
  //           value
  //         );
  //       changeEncounterStatus(record?.encounter_id);
  //       setSearchFilters((prev) => ({
  //         ...prev,
  //         practitioner_id: value || null,
  //       }));
  //       setSelectedPractitioner(value || null);
  //     } else if (type === "status") {
  //       setIsResetFiltersOn(false);
  //       storeInLocal(`${currentPractitioner?.org_uuid}_savedStatus`, value);
  //       setSearchFilters((prev) => ({
  //         ...prev,
  //         status: value || null,
  //       }));
  //     }
  //   };

  //   const handleStatusChange = (value) => {
  //     setIsResetFiltersOn(false);
  //     analytics.track("Selected Status Filter Option In Aura");
  //     dispatch(selectedEncounterSlice(null));
  //     if (value === "all") {
  //       storeInLocal(`${currentPractitioner?.org_uuid}_savedStatus`, "");
  //       setSearchFilters((prevFilters) => ({
  //         ...prevFilters,
  //         status: "",
  //       }));
  //     } else {
  //       storeInLocal(`${currentPractitioner?.org_uuid}_savedStatus`, value);
  //       setSearchFilters((prevFilters) => ({
  //         ...prevFilters,
  //         status: value,
  //       }));
  //     }
  //     setPageState({
  //       current: 1,
  //       pageSize: 10,
  //     });
  //   };

  //   const savedPractitioner_ID = getFromStorage(
  //     `${currentPractitioner?.org_uuid}_storePractitioner`
  //   );

  //   useEffect(() => {
  //     if (savedPractitioner_ID) {
  //       savedPractitioner_ID !== "All"
  //         ? setSelectedPractitioner(parseInt(savedPractitioner_ID))
  //         : setSelectedPractitioner(savedPractitioner_ID);
  //     }
  //   }, [savedPractitioner_ID]);

  //   //Reset functionality
  //   const resetFilters = () => {
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_startDateRange`);
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDateRange`);
  //     localStorage.removeItem(
  //       `${currentPractitioner?.org_uuid}_storePractitioner`
  //     );
  //     localStorage.removeItem(
  //       `${currentPractitioner?.org_uuid}_selectedTitleEncounter`
  //     );
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedSearch`);
  //     localStorage.removeItem(
  //       `${currentPractitioner?.org_uuid}_selectedPractitioner`
  //     );
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedTab`);
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedDate`);
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_savedStatus`);
  //     localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectedDates`);
  //     setSelectedTitleEncounter("");
  //     analytics.track("Clicked Clear Filters In Aura", {});
  //     setSavedStartDate && setSavedStartDate(null);
  //     setSavedEndDate && setSavedEndDate(null);
  //     setSearchFilters({});
  //     setSelectedDate("Today");
  //     setSelectedPractitioner("All");
  //     setStartDate(null);
  //     setEndDate(null);
  //     setRenameTitleEncounter("");
  //     setSelectedTab && setSelectedTab("Today");
  //     setResetDateFilter(true);
  //     setSelectedFilter("");
  //     setIsResetFiltersOn(true);
  //   };

  //   const loggedInUserName = currentPractitioner?.practitioner_name;
  //   const [loggedInSelectedPractitioner, setloggedInSelectedPractitioner] =
  //     useState(null);

  //   useEffect(() => {
  //     setloggedInSelectedPractitioner(loggedInUserName);
  //   }, [loggedInUserName]);

  //   const storeSavedTabMobile = getFromStorage(
  //     `${currentPractitioner?.org_uuid}_selectedTab`
  //   );
  //   const [currentDate, setCurrentDate] = useState(new Date());

  //   const handleMonthChange = (increment) => {
  //     const newDate = new Date(currentDate);
  //     newDate.setMonth(newDate.getMonth() + increment);
  //     setCurrentDate(newDate);
  //   };

  //   const handleYearChange = (increment) => {
  //     const newDate = new Date(currentDate);
  //     newDate.setFullYear(newDate.getFullYear() + increment);
  //     setCurrentDate(newDate);
  //   };

  //   const renderCalendar = (date, onSelectDateRange, selectedDates) => {
  //     const daysInMonth = new Date(
  //       date.getFullYear(),
  //       date.getMonth() + 1,
  //       0
  //     ).getDate();
  //     const firstDayOfMonth = new Date(
  //       date.getFullYear(),
  //       date.getMonth(),
  //       1
  //     ).getDay();
  //     const today = new Date();

  //     const dates = [];
  //     let startSelection = selectedDates[0] ? new Date(selectedDates[0]) : null;
  //     let endSelection = selectedDates[1] ? new Date(selectedDates[1]) : null;

  //     const selectDate = (currentDate) => {
  //       setIsResetFiltersOn(false);
  //       if (!startSelection || (startSelection && endSelection)) {
  //         startSelection = currentDate;
  //         endSelection = null;
  //       } else {
  //         endSelection = currentDate;
  //       }
  //       startSelection && endSelection
  //         ? analytics.track("Clicked Date Filter In Aura", {})
  //         : "";
  //       onSelectDateRange(startSelection, endSelection);
  //     };

  //     for (let i = 1; i <= daysInMonth; i++) {
  //       const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
  //       let className = "calendar-day";

  //       if (startSelection && endSelection) {
  //         if (currentDate.getTime() === startSelection.getTime()) {
  //           className += " selected-start";
  //         } else if (currentDate.getTime() === endSelection.getTime()) {
  //           className += " selected-end";
  //         } else if (currentDate > startSelection && currentDate < endSelection) {
  //           className += " selected-middle";
  //         }
  //       } else if (
  //         startSelection &&
  //         currentDate.getTime() === startSelection.getTime()
  //       ) {
  //         className += " selected-start";
  //       }

  //       if (currentDate.toDateString() === today.toDateString()) {
  //         className += " current-date";
  //       }

  //       if (startSelection && !endSelection && currentDate < startSelection) {
  //         className += " disabled";
  //       }

  //       if (endSelection) {
  //         className = className.replace("disabled", "");
  //       }

  //       dates.push(
  //         <div
  //           key={currentDate}
  //           className={className}
  //           onClick={() => selectDate(currentDate)}
  //         >
  //           {i}
  //         </div>
  //       );
  //     }

  //     // Empty divs to fill up the grid until the first day of the month
  //     for (let i = 0; firstDayOfMonth > 0 && i < firstDayOfMonth; i++) {
  //       dates.unshift(
  //         <div key={`empty-${i}`} className="calendar-day empty"></div>
  //       );
  //     }

  //     return (
  //       <div className="calendar">
  //         <div className="calendar-grid">
  //           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
  //             <div className="calendar-day-name" key={day}>
  //               {day}
  //             </div>
  //           ))}
  //           {dates}
  //         </div>
  //       </div>
  //     );
  //   };

  //   const selectedPractitionerObj = options.find(
  //     (option) => option.value === selectedPractitioner
  //   );
  //   let hideTimeout = null;

  //   const handleMouseEnter = (dropdown) => {
  //     if (hideTimeout) {
  //       clearTimeout(hideTimeout);
  //     }
  //     setHoverStatesEncounter((prevState) => ({
  //       ...prevState,
  //       [dropdown]: true,
  //     }));
  //   };

  //   const handleMouseLeave = (dropdown) => {
  //     hideTimeout = setTimeout(() => {
  //       setHoverStatesEncounter((prevState) => ({
  //         ...prevState,
  //         [dropdown]: false,
  //       }));
  //     }, 100);
  //   };

  //   const handleAddEncounterClick = () => {
  //     setSelectedFilter("Today");
  //   };

  const today = moment().format("YYYY-MM-DD");
  const storeSavedTabMobile = null;
  const [selectedTab, setSelectedTab] = useState(
    storeSavedTabMobile ? storeSavedTabMobile : "Today"
  );
  const [listEncounters, setListEncounters] = useState([]);
  const [pageState, setPageState] = useState({
    current: 1,
    pageSize: 20,
  });
  const [selectedTabDate, setSelectedTabDate] = useState(today);
  const [selectedLastWeek, setSelectedLastWeek] = useState(
    storeSavedTabMobile === "Last week" ? "Last week" : null
  );

  //Triggers initial api call to list encounters
  useEffect(() => {
    setListEncounters(encountersJson.encounters);
  }, [encountersJson]);

  //Function to store and reset selected tab dates in mobile view
  const handleTabChange = (key) => {
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
      setSelectedTabDate(today);
      setSelectedLastWeek(null);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center past mb-3">
        <Segmented
          size="small"
          options={["Today", "Yesterday", "Last week", "All time"]}
          onChange={(key) => handleTabChange(key)}
          className="text-xs"
          value={storeSavedTabMobile ? storeSavedTabMobile : selectedTab}
        />
      </div>
      {/* <div className=" justify-start mb-2 past h-10 items-center bg-white shadow-sm rounded-xl flex">
        <SelectHover
          bordered={false}
          popupClassName={`font-sans`}
          className="font-normal text-sm text-black flex items-center"
          options={options}
          filterOption={(inputValue, option) =>
            option && option.name
              ? option.name.toLowerCase().indexOf(inputValue.toLowerCase()) !==
                -1
              : false
          }
          placeholder="Select practitioner"
          onChange={(e, option) => onChange(e, option, "practitioner")}
          loading={practitionerListLoading}
          value={
            selectedPractitioner
              ? selectedPractitionerObj && {
                  label: selectedPractitionerObj.label,
                  value: selectedPractitioner,
                }
              : loggedInSelectedPractitioner
          }
          optionFilterProp="label"
          showSearch
          allowClear
          labelInValue
        />
      </div> */}

      {/* <div
        id="CustomFilter"
        className="w-full h-10 flex items-center drop-shadow-sm bg-white rounded-xl text-sm justify-around mb-2"
      >
        <div className="ml-2">
          <RecentSearchIcon />
        </div>
        <Select
          // dropdownStyle={{ width: '300px' }}
          bordered={false}
          className="border-none truncate font-sans text-base flex items-center w-full border-0 focus:outline-none mt-1  pr-4"
          value={
            renameTitleEncounter || selectedTitleEncounter || "Custom views"
          }
          // placeholder="Custom search"
          optionFilterProp="label"
          showSearch={false}
        >
          <Option disabled key="save_view" value="save_view">
            <button
              onClick={handleAddLabel}
              type="button"
              className="flex items-center py-2 px-1 hover:bg-gray-100 rounded-md text-left w-full"
            >
              <TagIcon className="mr-2" fill="#000000" />
              <span className="text-black">Save this view...</span>
            </button>
          </Option>
          <Option disabled key="manage-view">
            <div className="">
              <button
                className="flex items-center py-2 px-1 hover:bg-gray-100 rounded-md text-left w-full"
                type="button"
                onClick={handleMangeViews}
              >
                <ManageViewsIcon className="mr-2" fill="#000000" />
                <span className="text-black">Manage views...</span>
              </button>
            </div>
          </Option>
          {Array.isArray(recentSearchList?.search_preference) &&
            recentSearchList?.search_preference.length > 0 && (
              <Option disabled key="recent-searches-heading">
                <div className="text-gray-400">My views</div>
              </Option>
            )}
          {Array.isArray(recentSearchList?.search_preference) &&
            recentSearchList?.search_preference.map((search, index) => {
              const uniqueKey = `${search?.practitioners
                .map((p) => p.practitionerId)
                .join(",")}-${search?.patient}-${search?.date}-${
                search?.status
              }-${index}`;
              return (
                <Option
                  key={uniqueKey}
                  value={search?.practitioners
                    .map((p) => p.practitionerId)
                    .flat()}
                  label={search?.practitioners
                    .map((p) => p.practitionerName)
                    .join(", ")}
                >
                  <button
                    type="button"
                    className="w-full text-left py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRecentSearchSelect(search);
                      setSelectedTitleEncounter(search.title);
                      localStorage.setItem(
                        `${currentPractitioner?.org_uuid}_selectedTitleEncounter`,
                        search.title
                      );
                    }}
                  >
                    <div className="flex flex-wrap text-wrap">
                      {search?.title && <div>{search?.title}</div>}
                    </div>
                  </button>
                </Option>
              );
            })}
        </Select>
        <SavedSearchEncounterModal
          isEncounterVisible={isEncounterVisible}
          handleCloseView={handleCloseView}
          selectedDate={selectedDate}
          selectedPractitioner={
            options.find((option) => option.value === selectedPractitioner)
              ?.name || "All Practitioners"
          }
          handleSaveView={handleSaveView}
          selectedFilter={selectedFilter}
          setRenameTitleEncounter={setRenameTitleEncounter}
          renameTitleEncounter={renameTitleEncounter}
          handleSaveDuplicate={handleSaveDuplicate}
          setDuplicateError={setDuplicateError}
          duplicateError={duplicateError}
          selectedTab={selectedTab}
          searchFilters={searchFilters}
        />
        <ManageSearchEncounterModal
          setRenameTitleEncounter={setRenameTitleEncounter}
          isMangeViewOpen={isMangeViewOpen}
          handleMangeViews={handleMangeViews}
          handleCloseManageView={handleCloseManageView}
          recentSearchList={recentSearchList}
          renameTitleEncounter={renameTitleEncounter}
          selectedTitleEncounter={selectedTitleEncounter}
          resetFilters={resetFilters}
          searchFilters={searchFilters}
        />
      </div> */}
      {/* <div className="flex justify-between gap-2">
        <div className="bg-white w-48 p-1 mb-2 rounded-xl drop-shadow-sm flex items-center tree-dropdown">
          <label
            htmlFor="status"
            className="mr-1 ml-2 text-sm text-black whitespace-nowrap"
          >
            Status
          </label>
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center flex-nowrap">
            <div className="grow shrink-0 w-full">
              <TreeSelectDropdown
                suffixIcon={
                  <ExpandIcon fill={"#000000"} className="mr-3 absolute ml-2" />
                }
                bordered={false}
                showSearch={false}
                popupClassName="!w-36"
                className="h-8 !w-28 bg-transparent border-none focus:border-none rounded-xl caret-transparent flex items-center hover:bg-transparent -mb-0"
                options={statusOptions}
                filterOption={(inputValue, option) =>
                  option && option.title
                    ? option.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    : false
                }
                placeholder="Select status"
                onChange={handleStatusChange}
                loading={practitionerListLoading}
                value={searchFilters?.status ? searchFilters?.status : ""}
              />
            </div>
          </div>
        </div>
        <button
          className=" hover:bg-gray-100 rounded-xl h-10 px-4 font-normal text-sm text-black drop-shadow-sm  hover:underline underline-offset-2 decoration-black"
          onClick={resetFilters}
        >
          Clear filters
        </button>
      </div> */}
    </>
  );
};
