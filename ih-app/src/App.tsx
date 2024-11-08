import "./App.css";
import { useAuth, useTenantsState } from "@frontegg/react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    // if you are using hosted login box change the value to 'oauth/account/logout'
    navigate("/account/logout");
  };
  // const loginWithRedirect = useLoginWithRedirect();
  // Uncomment this to redirect to login automatically
  console.log("isAuthenticated",isAuthenticated);
  const { tenants } = useTenantsState();
 console.log("tenantsApp", tenants);
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     console.log("loginWithRedirect", loginWithRedirect);
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, loginWithRedirect]);
  return (
    <div>
      {isAuthenticated && (
        <>
          <span>
            You are authenticated, you can close this tab and open the extension
          </span>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
