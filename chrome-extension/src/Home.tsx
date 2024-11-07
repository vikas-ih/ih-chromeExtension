import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { useCallback } from "react";
import TopNavBar from "./components/TopNavBar";

const APP_URL = "http://localhost:5174/account/login"; //PORT should be where the ih-app is running
// const APP_URL = "https://auth.lumi.build/oauth/account/login";


const Home = () => {
  const user = useAuthUserOrNull();
  // const apiCall=()=>{
  // fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  // }
  const login = useCallback(() => {
    chrome.tabs.create({ url: APP_URL });
  }, []);
      // apiCall();

 console.log("user", user);
  if (!user) {
    return <button onClick={login}>Click me to login</button>;
  } else {
    return (
      <h2 className="text-black flex items-center justify-center ">
        Welcome {user?.name}, you are authenticated person.
      </h2>
      // <TopNavBar/>
    );
  }
};

export default Home;
