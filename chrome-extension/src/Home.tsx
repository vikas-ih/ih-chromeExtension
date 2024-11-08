import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { useCallback } from "react";
import TopNavBar from "./components/TopNavBar";
const APP_URL = "http://localhost:5174/account/login"; //PORT should be where the ih-app is running
// const APP_URL = "https://auth.lumi.build/oauth/account/login";
// import {  useTenantsState } from "@frontegg/react-hooks";
import {
  useTenantsState,
} from "@frontegg/react";

const Home = () => {
  const user = useAuthUserOrNull();
  const login = useCallback(() => {
    chrome.tabs.create({ url: APP_URL });
  }, []);
    const { tenants, activeTenant } = useTenantsState();
  console.log("tenants", useTenantsState);

 console.log("user", user);
  if (!user) {
    return <button onClick={login}>Click me to login</button>;
  } else {
    return (
      <TopNavBar/>
    );
  // }
};

export default Home;
