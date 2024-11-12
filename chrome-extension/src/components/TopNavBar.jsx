import { useEffect, useState } from "react";
import { Header, Text } from "./baseComponents";
import {
  Dropdown as AntDropdown,
  Divider,
  AutoComplete,
  Menu
} from "antd";
import moment from "moment";

import {
  DropdownIcon,
  EditIcon,
  SearchIcon,
  SignoutIcon,
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
} from "@frontegg/react";
import { getFromStorage } from "../lib/storage";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import Encounter from "./Encounter";

const TopNavBar = ({list}) => {
  // let { tenants } = useTenantsState();
  const data = useAuthUserOrNull();
  const { user, tenants } = data;
  console.log("tenants", data.tenants);
  console.log("user", data.user);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredTenantsNames, setFilteredTenantsNames] = useState([]);
  const [editingRow, setEditingRow] = useState("");
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

  const logout = () => {
    setDropdownVisible(false);
    const baseUrl = ContextHolder.getContext().baseUrl;
    // analytics.track("Signed Out", {
    //   email: user?.email,
    //   orgId: org_id,
    // });
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

      {list && <Encounter />}
      {list && (
        <div className="bg-[#00D090] rounded-full w-16 h-16 fixed bottom-20 right-8 flex items-center justify-center">
          <MicroPhone />
        </div>
      )}
    </>
  );
};

export default TopNavBar;
