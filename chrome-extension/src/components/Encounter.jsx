import { useEffect, useState } from "react";

import { EncounterTable } from "./baseComponents/EncounterTable";
import { dataSource, formatEncounterStatus, getEncounterStatus } from "../utilities/columns";
import { ProfileLogo } from "./baseComponents/ProfileLogo";
import { Dropdown as AntDropdown, Input, Pagination, Tooltip } from "antd";
import { CloseAiIcon, EditableIcon, UpdateIcon } from "../icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  encounterDetailsSlice,
  listEncounters,
  mobileViewStatusSlice,
  setMobileRecord,
  updateEncounter,
} from "../store/slice/encounter.slice";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
// import { getAuthHeaders } from "../store/apiConfig";
import { LoadingBar } from "./baseComponents/LoadingBar";
import { showToastError } from "../utilities/errortoast";
import { ActionsDropdown } from "./baseComponents/ActionDropdown";
import { storeInLocal } from "../lib/storage";
import { useNavigate } from "react-router-dom";

const Encounter = () => {
  // const encounterList = dataSource;
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const [editingRow, setEditingRow] = useState("");
  const [storedParams, setStoredParams] = useState("");
  const [editInputOpen, setEditInputOpen] = useState(false);
  const [encounterPhase, setEncounterPhase] = useState("in-visit");
  const [encounterStatus, setEncounterStatus] = useState("");
  const [record, setRecord] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const { encounters, loading, error, count } = useSelector(
  //   (state) => state.encounters
  // );
  const { encounterList, isEncounterListLoading, error, encounterListCount } =
    useSelector((state) => state.encounters);

  const { isMobileRecord, newEncounterfromMic } = {
    isMobileRecord: false,
    newEncounterfromMic: false,
  };
  //useSelector(
  //   (state) => state?.encounterState
  // );  //env
  const [selectedEncounter, setSelectedEncounter] = useState("");
  const handleDescriptionChange = (e, record) => {
    const updatedEncounter = { ...record, description: e.target.value };
    setEditingRow(updatedEncounter);
  };

  const handleMobileRowClick = (record) => {
    dispatch(encounterDetailsSlice(record));
    storeInLocal("uuid", record?.appt_uuid);
    dispatch(setMobileRecord(true));
    dispatch(mobileViewStatusSlice(record));
    // setSelectedTab("Today");
    // setSelectedLastWeek(null);
    navigate(`/mobileEncounterDetails/${record?.encounter_id}`);
    // setSelectedTabDate(today);/
    // setPageState({
    //   current: 1,
    //   pageSize: 10,
    // });
  };

  const handleSaveDescription = (record) => {
    const params = {
      ...storedParams,
    };
    if (!editingRow.description.trim()) {
      showToastError("Description cannot be empty!");
      return;
    }

    //  if (schedulepage) {
    //    analytics.track("Edited Encounter's Description From VCA", {});
    //  } else {
    //    analytics.track("Edited Encounter's Description From Aura", {});
    //  }

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
  const [page, setCurrentPage] = useState(1);
  const pageHandler = (page, pageSize) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const searchFilters = {
      status: "",
      page: page,
      per_page: 5,
      sort_by: "created_at",
      sort_direction: "desc",
      created_at_gt: "2024-11-08T00:00:00+05:30",
      created_at_lt: "2024-11-08T23:59:59+05:30",
    };
    // const headers = getAuthHeaders(accessToken);
    setStoredParams(searchFilters);
    dispatch(listEncounters({ searchFilters, accessToken }));
  }, [dispatch, page]);

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
                      //  searchFilters={searchFilters}
                      //  record={record}
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
  return (
    <>
      <div className="mt-2 mb-24 p-4 relative ">
        <div
          className={`min-h-screen grid shadow-xl ant-table-wrappers rounded-xl bg-white relative`}
        >
          <EncounterTable
            columns={columns}
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // setSearchFilters={setSearchFilters}
            // setTopBarInputs={setTopBarInputs}
            // onCreateEncounter={() => handleCreateEncounter(storedParams)}
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
            // Sorting
            sortDirections={["asc", "desc", "asc"]}
            // sortedInfo={sortState}
          />
          <div className="sticky bottom-0 bg-white  flex items-center justify-center ">
            {encounterList.length > 0 && (
              <Pagination
                current={page}
                pageSize={5}
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
    </>
  );
};

export default Encounter;
