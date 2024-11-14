import { Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { getFromStorage, storeInLocal } from "../../lib/storage";
import moment from "moment";
import { TreeSelectDropdown } from "./TreeSelect";
import { ExpandIcon } from "../../icons";
import { selectedEncounterSlice } from "../../store/slice/encounter.slice";
import { useDispatch } from "react-redux";
import { SelectHover } from "./SelectHover";
import { PractitionerJson } from "../../mocks/pracitioners";

const EncounterTopNavBar = ({
  searchFilters,
  page,
  setSearchFilters,
  selectedTab,
  storeSavedTabMobile,
  handleTabChange,
  isEncounterListLoading,
  resetFilters,
  setPageState,
  setIsResetFiltersOn,
  currentPractitioner,
  selectedPractitioner,
  setSelectedPractitioner,
  changeEncounterStatus,
  record,
}) => {
  const dispatch = useDispatch();

  const practitionerList = PractitionerJson;
  const options = practitionerList?.map((practitioner, index, array) => {
    const practitionersWithSameName = array.filter(
      (p) => p.full_name === practitioner.full_name && p !== practitioner
    );
    const displayEmail = practitionersWithSameName.length > 0;
    return {
      value: practitioner.practitioner_id,
      label: (
        <div>
          <div>{practitioner.full_name}</div>
          {displayEmail && (
            <div
              style={{
                color: "grey",
                fontSize: "smaller",
                fontFamily: "Poppins",
              }}
            >
              {practitioner.practitioner_email}
            </div>
          )}
        </div>
      ),
      name: practitioner.full_name,
    };
  });
  const loggedInUserName = currentPractitioner?.practitioner_name;
  const [loggedInSelectedPractitioner, setloggedInSelectedPractitioner] =
    useState(null);

  const statusOptions = [
    {
      title: "All",
      value: "",
      className:
        "flex justify-center text-xs  bg-[#ffffff] items-center h-8 rounded-full hover:bg-[#f7f7f7]",
    },
    {
      title: "Completed",
      value: "completed",
      className:
        "text-[#1ec990] bg-[#eefaf4] h-8 text-xs flex items-center justify-center rounded-full hover:bg-[#A2EFC9]",
    },
    {
      title: "In Progress",
      value: "inprogress",
      className:
        "text-[#ff6f00] bg-[#ffe1ca] h-8 text-xs flex items-center justify-center rounded-full hover:bg-[#F7CFB1]",
    },
    {
      title: "Not Started",
      value: "new",
      className:
        "text-[#5a8dda] bg-[#e7f1ff] text-xs h-8 flex items-center justify-center rounded-full hover:bg-[#BCD4F7]",
    },
  ];

  const onChange = (value, option, type) => {
    setPageState({
      current: 1,
      pageSize: 10,
    });
    dispatch(selectedEncounterSlice(null));

    if (type === "practitioner") {
      console.log("value", value);
      setIsResetFiltersOn(false);
      //   analytics.track("Selected Practitioner Filter Option In Aura");
      value &&
        storeInLocal(
          `${currentPractitioner?.org_uuid}_storePractitioner`,
          value
        );
      changeEncounterStatus(record?.encounter_id);
      setSearchFilters((prev) => ({
        ...prev,
        practitioner_id: value || null,
      }));
      setSelectedPractitioner(value || null);
    } else if (type === "status") {
      setIsResetFiltersOn(false);
      storeInLocal(`${currentPractitioner?.org_uuid}_savedStatus`, value);
      setSearchFilters((prev) => ({
        ...prev,
        status: value || null,
      }));
    }
  };

  const selectedPractitionerObj = options.find(
    (option) => option.value === selectedPractitioner
  );

  const handleStatusChange = (value) => {
    // setIsResetFiltersOn(false);
    // analytics.track("Selected Status Filter Option In Aura");
    dispatch(selectedEncounterSlice(null));
    if (value === "all") {
      storeInLocal(`${currentPractitioner?.org_uuid}_savedStatus`, "");
      setSearchFilters((prevFilters) => ({
        ...prevFilters,
        status: "",
      }));
    } else {
      storeInLocal(`${currentPractitioner?.org_uuid}_savedStatus`, value);
      setSearchFilters((prevFilters) => ({
        ...prevFilters,
        status: value,
      }));
    }
    setPageState({
      current: 1,
      pageSize: 10,
    });
  };

  useEffect(() => {
    setloggedInSelectedPractitioner(loggedInUserName);
  }, [loggedInUserName]);
  console.log("isEncounterListLoading", isEncounterListLoading);
  return (
    <div className="px-4 py-1">
      <div className="flex justify-center items-center past p-1 mb-3 mt-1">
        <Segmented
          size="small"
          options={["Today", "Yesterday", "Last week", "All time"]}
          onChange={(key) => handleTabChange(key)}
          className="text-xs"
          value={storeSavedTabMobile ? storeSavedTabMobile : selectedTab}
        />
      </div>
      <div className=" justify-start mb-2 past h-10 items-center bg-white shadow-sm rounded-xl flex">
        <SelectHover
          bordered={false}
          popupClassName={`font-sans text-xs`}
          inputClassName={"font-normal text-xs text-black flex items-center"}
          className="font-normal text-xs text-black flex items-center"
          options={options}
          filterOption={(inputValue, option) =>
            option && option.name
              ? option.name.toLowerCase().indexOf(inputValue.toLowerCase()) !==
                -1
              : false
          }
          placeholder="Select practitioner"
          onChange={(e, option) => onChange(e, option, "practitioner")}
          loading={isEncounterListLoading} //check
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
      </div>
      <div className="flex justify-between gap-2">
        <div className="bg-white w-48 p-1 mb-2 rounded-xl drop-shadow-sm flex items-center tree-dropdown">
          <label
            htmlFor="status"
            className="mr-1 ml-2 text-xs text-black whitespace-nowrap"
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
                loading={isEncounterListLoading}
                value={searchFilters?.status ? searchFilters?.status : ""}
              />
            </div>
          </div>
        </div>
        <button
          className=" hover:bg-gray-100 rounded-xl h-10 px-4 font-normal text-xs text-black drop-shadow-sm  hover:underline underline-offset-2 decoration-black"
          onClick={resetFilters}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default EncounterTopNavBar;
