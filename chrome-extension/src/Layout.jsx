import React from "react";
import NavBar from "./components/TopNavBar";

const Layout = ({ children }) => {
  return (
    <div style={{ position: "relative" }}>
      <NavBar
        style={{ position: "absolute", top: 0, zIndex: 1000, width: "100%" }}
      />
      {/* Page content */}
      <div style={{ marginTop: "0px" }}>{children}</div>{" "}
    </div>
  );
};

export default Layout;
