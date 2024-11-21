import React, { useCallback, useEffect } from "react";
import NavBar from "./components/TopNavBar";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import {
  getCurrentPractitioner,
  getCurrentPractitionerSettings,
} from "./store/actions/practitioner.action";
import { storeInLocal } from "./lib/storage";

const Layout = ({ children }) => {
  const user = useAuthUserOrNull();
  const loggedInUser = user?.user;
  const dispatch = useDispatch();
  const login = useCallback(() => {
    chrome.tabs.create({ url: APP_URL });
  }, []);

  useEffect(() => {
    if (user) {
      const accessToken = loggedInUser?.accessToken;

      dispatch(getCurrentPractitioner(accessToken));
      dispatch(getCurrentPractitionerSettings(accessToken));
      storeInLocal(`user_name`, loggedInUser?.name);
      storeInLocal(`user_email`, loggedInUser?.email);
      storeInLocal(`user_id`, loggedInUser?.id);
      // window.analytics.identify(localStorage.getItem("user_id"), {
      //   email: localStorage.getItem("user_email"),
      //   name: localStorage.getItem("user_name"),
      // });
    }
  }, [user]);

  if (isEmpty(user)) {
    return <button onClick={login}>Click me to login</button>;
  } else {
    return (
      <div style={{ position: "relative" }}>
        <NavBar
          style={{ position: "absolute", top: 0, zIndex: 1000, width: "100%" }}
        />
        {/* Page content */}
        <div style={{ marginTop: "0px" }}>{children}</div>{" "}
      </div>
    );
  }
};

export default Layout;
