// import { FronteggProvider } from "@frontegg/react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   // Navigate,
//   // useLocation,
// } from "react-router-dom";
import './App.css'
import { FronteggStoreProvider } from "@frontegg/react-hooks";
import { FronteggApp } from "@frontegg/js";
import {
  ContextHolder,
  ContextOptions,
  createApiClient,
} from "@frontegg/rest-api";
import Home from './Home';
import { useEffect } from "react";


// const contextOptions = {
//   baseUrl: "https://auth.lumi.build",
//   clientId: "a2232153-71a3-4b40-a026-4d6051b47564",
//   // appId: "[YOUR_APP_ID]",
// };
const contextOptions: ContextOptions = {
  baseUrl: "https://app-jabl76n0368q.frontegg.com",
  clientId: "c5c45429-71e8-4c53-9c62-5bd33aeaab0f",
  appId: "201597ba-bc17-4d76-ba3b-c1e82dc8b7fc",
  requestCredentials: "include",
};
ContextHolder.for("Insight-Health").setContext(contextOptions);

const fronteggApp: FronteggApp = new FronteggApp(
  {
    contextOptions,
    hostedLoginBox: false,
  },
  "default"
);

function App() {
  useEffect(() => {
    createApiClient("Insight-Health")
      .auth.refreshTokenV3()
      .then((user) => {
        fronteggApp?.store.dispatch({
          type: "auth/setState",
          payload: {
            isLoading: false,
            user,
            isAuthenticated: true,
          },
        });
      })
      .catch((e) => {
        console.error("failed to call silent refresh login", e);
        fronteggApp?.store.dispatch({
          type: "auth/setState",
          payload: {
            isLoading: false,
            user: null,
            isAuthenticated: false,
          },
        });
      });
  }, []);
  return (
    <FronteggStoreProvider app={fronteggApp} contextOptions={contextOptions}>
      <Home />
    </FronteggStoreProvider>
  );
}

export default App
