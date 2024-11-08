import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { useCallback } from "react";
import TopNavBar from "./components/TopNavBar";
const APP_URL = "http://localhost:5174/account/login"; //PORT should be where the ih-app is running

import { isEmpty } from "lodash";

const Home = () => {
  const user = useAuthUserOrNull() ;
  const login = useCallback(() => {
    chrome.tabs.create({ url: APP_URL });
  }, []);

  if (isEmpty(user)) {
    return <button onClick={login}>Click me to login</button>;
  } else {
    return (
      <TopNavBar
      />
    );
  }
};

export default Home;
