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
  baseUrl: "https://app-dur7z3jxz6xz.us.frontegg.com",
  clientId: "a2232153-71a3-4b40-a026-4d6051b47564",
  appId: "5597c702-9c72-4643-aed8-029f27283aa9",
  requestCredentials: "include",
};

ContextHolder.for("Care Connect").setContext(contextOptions);

const fronteggApp: FronteggApp = new FronteggApp(
  {
    contextOptions,
    hostedLoginBox: false,
  },
  "default"
);

function App() {
  useEffect(() => {
    createApiClient("Care Connect")
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
