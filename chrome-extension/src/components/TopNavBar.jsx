import { useEffect, useState } from "react";
import { Header, Text } from "./baseComponents";
import {
  Dropdown as AntDropdown,
  Divider,
  AutoComplete,
  Menu,
  Input,
  Tooltip,
} from "antd";
import moment from "moment";

import {
  DropdownIcon,
  EditIcon,
  SearchIcon,
  SignoutIcon,
  AmbientMblHoverIcon,
  UpdateIcon,
  CloseAiIcon,
  EditableIcon,
} from "../icons";
import { MicroPhone } from "../icons/Microphone.icon";

import { BankOutlined, CheckOutlined } from "@ant-design/icons";
import { ProfileTopNavbar } from "./baseComponents/ProfileTopNavbar";

import {
  AdminPortal,
  // ContextHolder,
  // useAuth,
  // useAuthActions,
  // useFeatureEntitlements,
  useTenantsState,
} from "@frontegg/react";
import { getFromStorage } from "../lib/storage";
import { NavLink } from "react-router-dom";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { dataSource, formatEncounterStatus } from "../utilities/columns";
import { EncounterTable } from "./baseComponents/EncounterTable";
import { ProfileLogo } from "./baseComponents/ProfileLogo";

const TopNavBar = () => {
  // let { tenants } = useTenantsState();
  const data = useAuthUserOrNull();
  const { user, tenants } = data;
  console.log("tenants", data.tenants);
  console.log("user", data.user);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredTenantsNames, setFilteredTenantsNames] = useState([]);
 const [editingRow,setEditingRow] = useState("");
  const cachedUserName = getFromStorage(`user_name`);
  const cachedUserEmail = getFromStorage(`user_email`);
  const cachedUserId = getFromStorage(`user_id`);
  const resetDropdown = () => {
    setDropdownVisible(false);
    setSearchText("");
    setFilteredTenantsNames(tenants);
  };

  const settings = () => {
    setDropdownVisible(false);
    //  analytics.track("Viewed Settings", {
    //    email: user?.email,
    //    orgId: org_id,
    //  });
    AdminPortal.show();
  };

  useEffect(() => {
    setFilteredTenantsNames(data.tenants);
  }, [data.tenants]);
  const encounterList = dataSource;

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
                      value={editingRow?.description}
                      //  onChange={(e) => handleDescriptionChange(e, record)}
                    />
                    <div
                      className="bg-[#00d091] rounded-full flex items-center justify-center p-1"
                      style={{ padding: "4px" }}
                    >
                      <UpdateIcon
                        onClick={() => {
                          //  handleSaveDescription(editingRow, storedParams);
                          //  setEditInputOpen(false);
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
                        //  onClick={() => {
                        //    setEditInputOpen(false);
                        //    setEditingRow(null);
                        //  }}
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
          //  if (!newEncounterfromMic) {
          //    setEncounterStatus(getEncounterStatus(record, encounterPhase));
          //    setRecord(record);
          //  }
          //  editInputOpen ? null : handleMobileRowClick(record);
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
                    //  onClick={() => {
                    //    setEditInputOpen(true);
                    //    setEditingRow(record);
                    //  }}
                    />
                  </div>
                </Tooltip>
              </span>
              <span>
                <Tooltip title="Remove Encounter" placement="topRight">
                  <div className="">
                    {/* <ActionsDropdown
                       encounterDetailsSlice={record}
                       searchFilters={searchFilters}
                       record={record}
                       storedParams={storedParams}
                     /> */}
                  </div>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const logout = () => {
    setDropdownVisible(false);
    const baseUrl = ContextHolder.getContext().baseUrl;
    analytics.track("Signed Out", {
      email: user?.email,
      orgId: org_id,
    });
    clearLoggedInUser();
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("show_current_practitioner");
    localStorage.clear();
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTenantsNames(filtered);
  };

  const switchOrganization = (e) => {
    localStorage.removeItem("filter_practitioner_id");
    localStorage.removeItem("selectedPractitioners");
    localStorage.removeItem("show_current_practitioner");
    localStorage.clear();
    // dispatch(getPractitionersAndPatientsSlice([]));
    // dispatch(getAppointmentByFilterSlice([]));
    // dispatch(getAppointmentsByStatusSlice([]));
    const selectedId = e.key;
    // switchTenant({ tenantId: selectedId });
  };

  const currentPractitioner = user;
  let fullName = currentPractitioner.name;
  let nameWithoutTitle = fullName.replace("Dr ", "");

  const singleOrganisationAccessAccount = filteredTenantsNames.length <= 1;

  const topNavbarDropdownOptions = singleOrganisationAccessAccount
    ? [
        {
          label: (
            <div className="flex p-4">
              <SignoutIcon className={"mr-2"} />
              <span className="font-sans text-sm">Sign out</span>
            </div>
          ),
          key: "logout",
          onClick: logout,
        },
      ]
    : [
        {
          label: (
            <div className="flex p-4">
              <div className="text-sm">
                <BankOutlined className="mr-2" />
                Organizations
              </div>
            </div>
          ),
        },
        {
          label: (
            <div className="p-2">
              <div className=" w-[19rem] ant-select-selector drop-shadow-md bg-white rounded-xl">
                <AutoComplete
                  bordered={false}
                  className="border-none font-sans h-10 flex items-center border-0 focus:outline-nones"
                  style={{ WebkitTextFillColor: "#000" }}
                  placeholder="Search organization"
                  suffixIcon={<SearchIcon />}
                  onSearch={handleSearch}
                  value={searchText}
                  id="Searchorganization"
                />
              </div>
            </div>
          ),
        },
        {
          label: (
            <Menu
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                backgroundColor: "white",
                width: "100%",
              }}
              id="menuorganization"
              items={filteredTenantsNames.map((tenant) => ({
                label: (
                  <div
                    key={tenant.tenantId}
                    className="flex items-center p-2 text-sm text-gray-600"
                  >
                    {tenant.name}
                    {tenant.tenantId === user.tenantId && (
                      <CheckOutlined className="ml-4 w-3 h-3" />
                    )}
                  </div>
                ),
                key: tenant.tenantId,
                disabled: tenant.tenantId === user.tenantId,
                onClick: switchOrganization,
              }))}
            />
          ),
        },
        {
          label: <Divider className="m-0 p-0" />,
        },
        {
          label: (
            <div className="flex p-4">
              <SignoutIcon className={"mr-2"} />
              <span className="font-sans text-sm">Sign out</span>
            </div>
          ),
          key: "logout",
          onClick: logout,
        },
      ];

  return (
    <>
      <nav className="sticky top-0 left-0 z-[98] bg-[#d9f6fd] flex justify-between items-center py-5 px-3">
        <div className="top-navbar-left flex items-center justify-start ">
          <h1 className="text-black text-[18px] font-semibold mx-2">
            Encounters
          </h1>
        </div>
        {/* <div className="h-7 w-7 rounded-full bg-[#ACD7C4] absolute right-10 flex items-center justify-center">
          <span className="relative text-white">T</span>
        </div> */}
        <div className="top-navbar-right flex items-center">
          <AntDropdown
            className="profile-dropdown"
            overlayClassName="profile-dropdown-overlay"
            open={dropdownVisible}
            onClick={() => setDropdownVisible(true)}
            onVisibleChange={(visible) => {
              resetDropdown();
            }}
            menu={{
              items: topNavbarDropdownOptions,
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="profile-wrapper flex items-center cursor-pointer">
                <ProfileTopNavbar
                  name={nameWithoutTitle}
                  className={"profile-popover-logo mr-1 sm:mr-2 lg:mr-3"}
                />
                <Text
                  type={"span"}
                  className={
                    tenants.length > 1
                      ? "user-name  hidden sm:block mr-1 sm:mr-2 lg:mr-3"
                      : "user-name hidden sm:block mr-1 sm:mr-2 lg:mr-3"
                  }
                >
                  {nameWithoutTitle}
                  {tenants.length > 1 && (
                    <div className="text-xs text-right text-gray-500">
                      <BankOutlined className="mr-1" />
                      {
                        tenants.find(
                          (tenant) => tenant.tenantId === user.tenantId
                        )?.name
                      }
                    </div>
                  )}
                </Text>
                <DropdownIcon className={"mt-1"} />
              </div>
            </div>
          </AntDropdown>
        </div>
      </nav>
      <div className="mt-2 mb-24 p-4 relative ">
        <div
          className={`min-h-screen grid shadow-xl ant-table-wrappers rounded-xl bg-white relative  `}
        >
          <EncounterTable
            columns={columns}
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // setSearchFilters={setSearchFilters}
            // setTopBarInputs={setTopBarInputs}
            // onCreateEncounter={() => handleCreateEncounter(storedParams)}
            ClassName={"tableai"}
            // rowClassName={(record, index) => {
            //   if (
            //     (selectedEncounter &&
            //       record?.encounter_id === selectedEncounter?.encounter_id) ||
            //     (index === 0 &&
            //       (selectedTab === "Today" ||
            //         selectedTab === "Yesterday" ||
            //         selectedTab === "Last week"))
            //   ) {
            //     return "bg-gray-100 shadow-inner transform transition duration-200 ease-in-out hover:shadow-lg cursor-pointer overflow-x-hidden";
            //   }
            //   return "";
            // }}
            showSorterTooltip={false}
            dataSource={encounterList}
            // loading={{
            //   indicator: <LoadingBar />,
            //   // spinning: isEncounterListLoading,
            // }}
            locale={{
              emptyText: "No Data",
            }}
            tableLayout="auto"
            // Sorting
            sortDirections={["asc", "desc", "asc"]}
            // sortedInfo={sortState}
          />
        </div>
      </div>
      <div className="bg-[#00D090] rounded-full w-16 h-16 fixed bottom-20 right-8 flex items-center justify-center">
        <MicroPhone />
      </div>

      {/* <nav className="fixed z-[100] h-10 bottom-0 left-0 right-0 bg-white rounded-t-xl px-0">
        <div className=" text-sm flex flex-col items-center justify-center">
          <div className="active-icon">
            <AmbientMblHoverIcon />
          </div>
          Aura AI Scribe
        </div>
      </nav> */}
    </>
  );
};

export default TopNavBar;
