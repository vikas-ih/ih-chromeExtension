import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { useCallback } from "react";

const APP_URL = "http://localhost:5174/";

const Home = () => {
  const user = useAuthUserOrNull();

  const login = useCallback(() => {
    chrome.tabs.create({ url: APP_URL });
  }, []);
 console.log("user", user);
  if (!user) {
    return <button onClick={login}>Click me to login</button>;
  } else {
    return (
      <div>
        <div>Welcome {user.name}, you are authenticated</div>
        <div>
          <img
            className="card-img"
            src={user?.profilePictureUrl || undefined}
            alt={user?.name}
          />
        </div>
      </div>
    );
  }
};

export default Home;
