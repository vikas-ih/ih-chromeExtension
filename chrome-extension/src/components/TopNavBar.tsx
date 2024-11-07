import { useState } from "react";
import { Header} from "./baseComponents";
import { Dropdown as AntDropdown,} from "antd";


const TopNavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const resetDropdown = () => {
    setDropdownVisible(false);
    // setSearchText("");
    // setFilteredTenantsNames(tenants);
  };
//    const topNavbarDropdownOptions = singleOrganisationAccessAccount
//      ? [
//          {
//            label: (
//              <div className="flex p-4">
//                <EditIcon className={"mr-2"} />
//                <span className="font-sans text-sm"> Settings</span>
//              </div>
//            ),
//            key: "settings",
//            onClick: settings,
//          },
//          {
//            label: (
//              <>
//                <Divider className="m-0 p-0" />
//              </>
//            ),
//            className: "p-0",
//          },
//          currentPractitioner?.stripe_customer_id && {
//            key: "billing",
//            label: <StripeBillingCustomerPortal />,
//          },
//          currentPractitioner?.stripe_customer_id && {
//            label: <Divider className="m-0 p-0" />,
//          },
//          {
//            label: (
//              <div className="flex p-4">
//                <SignoutIcon className={"mr-2"} />
//                <span className="font-sans text-sm">Sign out</span>
//              </div>
//            ),
//            key: "logout",
//            onClick: logout,
//          },
//        ]
//      : [
//          {
//            label: (
//              <div className="flex p-4">
//                <EditIcon className={"mr-2"} />
//                <span className="font-sans text-sm"> Settings</span>
//              </div>
//            ),
//            key: "settings",
//            onClick: settings,
//          },
//          {
//            label: (
//              <>
//                <Divider className="m-0 p-0" />
//              </>
//            ),
//            className: "p-0",
//          },
//          {
//            label: (
//              <div className="flex p-4">
//                <div className="text-sm">
//                  <BankOutlined className="mr-2" />
//                  Organizations
//                </div>
//              </div>
//            ),
//          },
//          {
//            label: (
//              <div className="p-2">
//                <div className=" w-[19rem] ant-select-selector drop-shadow-md bg-white rounded-xl">
//                  <AutoComplete
//                    bordered={false}
//                    className="border-none font-sans h-10 flex items-center border-0 focus:outline-nones"
//                    style={{ WebkitTextFillColor: "#000" }}
//                    placeholder="Search organization"
//                    suffixIcon={<SearchIcon />}
//                    onSearch={handleSearch}
//                    value={searchText}
//                    id="Searchorganization"
//                  />
//                </div>
//              </div>
//            ),
//          },
//          {
//            label: (
//              <Menu
//                style={{
//                  maxHeight: "200px",
//                  overflowY: "auto",
//                  backgroundColor: "white",
//                }}
//                id="menuorganization"
//                items={filteredTenantsNames.map((tenant) => ({
//                  label: (
//                    <div
//                      key={tenant.tenantId}
//                      className="flex items-center p-2 text-sm text-gray-600"
//                    >
//                      {tenant.name}
//                      {tenant.tenantId === user.tenantId && (
//                        <CheckOutlined className="ml-4 w-3 h-3" />
//                      )}
//                    </div>
//                  ),
//                  key: tenant.tenantId,
//                  disabled: tenant.tenantId === user.tenantId,
//                  onClick: switchOrganization,
//                }))}
//              />
//            ),
//          },
//          currentPractitioner?.stripe_customer_id && {
//            label: <Divider className="m-0 p-0" />,
//          },
//          currentPractitioner?.stripe_customer_id && {
//            key: "billing",
//            label: <StripeBillingCustomerPortal />,
//          },
//          {
//            label: <Divider className="m-0 p-0" />,
//          },
//          {
//            label: (
//              <div className="flex p-4">
//                <SignoutIcon className={"mr-2"} />
//                <span className="font-sans text-sm">Sign out</span>
//              </div>
//            ),
//            key: "logout",
//            onClick: logout,
//          },
//        ];
  return (
    <nav className="top-navbar sticky top-0 left-0 z-[98] flex justify-between items-center">
      <div className="top-navbar-left flex items-center justify-start">
        <Header
          type={"h1"}
          className={`page-header`}
          id="header-id"
          name="header-name" // Add a suitable name
          onClick={() => {}}
        >
          Encounters
        </Header>
      </div>
      {/* <div className="top-navbar-right flex items-center">
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
                    ? "user-name mt-4 hidden sm:block mr-1 sm:mr-2 lg:mr-3"
                    : "user-name hidden sm:block mr-1 sm:mr-2 lg:mr-3"
                }
              >
                {cachedUserName}
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
      </div> */}
    </nav>
  );
}

export default TopNavBar