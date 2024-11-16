import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { useCallback } from "react";
import TopNavBar from "./components/TopNavBar";
const APP_URL = "http://localhost:5174/account/login"; //PORT should be where the ih-app is running
// import { useFeatureEntitlements } from "@frontegg/react";

import { isEmpty } from "lodash";
import BaseNavBar from "./components/baseComponents/BaseNavBar";

const Home = () => {
  const user = useAuthUserOrNull() ;
  const login = useCallback(() => {
    chrome.tabs.create({ url: APP_URL });
  }, []);
//  console.log("useFeatureEntitlements", useFeatureEntitlements("dictation"));
  if (isEmpty(user)) {
    return <button onClick={login}>Click me to login</button>;
  } else {
    return (
     <>
      <TopNavBar list={true}/>
      <BaseNavBar/>
     </>
    );
  }
};

export default Home;
