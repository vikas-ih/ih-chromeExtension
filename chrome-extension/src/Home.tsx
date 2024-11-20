import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { useCallback, useEffect } from "react";
import TopNavBar from "./components/TopNavBar";
const APP_URL = "http://localhost:5174/account/login"; //PORT should be where the ih-app is running
// import { useFeatureEntitlements } from "@frontegg/react";

import { isEmpty } from "lodash";
import BaseNavBar from "./components/baseComponents/BaseNavBar";
import {
  getCurrentPractitioner,
  getCurrentPractitionerSettings,
} from "./store/actions/practitioner.action";
import { storeInLocal } from "./lib/storage";
import { useDispatch } from "react-redux";
import Encounter from "./components/Encounter";

const Home = () => {
  const user = useAuthUserOrNull() as any;
  const loggedInUser = user?.user;
  const dispatch = useDispatch();
  const login = useCallback(() => {
    chrome.tabs.create({ url: APP_URL });
  }, []);

  useEffect(() => {
    if (user) {
      //  loadEntitlements();
      const accessToken = loggedInUser?.accessToken;

      dispatch(getCurrentPractitioner(accessToken) as any);
      dispatch(getCurrentPractitionerSettings(accessToken) as any);
      // dispatch(getCurrentPractitionerEntitlements());
      // dispatch(authenticationStatus(true));
      // identifyLoggedInUser(user);
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
      <>
        <Encounter/>
        <BaseNavBar />
      </>
    );
  }
};

export default Home;
