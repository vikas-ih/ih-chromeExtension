
import "./App.css";
import { FronteggStoreProvider } from "@frontegg/react-hooks";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { FronteggApp } from "@frontegg/js";
import {
  ContextHolder,
  ContextOptions,
  createApiClient,
} from "@frontegg/rest-api";
import Home from "./Home";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import EncounterDetails from "./EncounterDetails";
import "./style/app.scss";
import { Appointments } from "./Appointments";
import Schedule from "./components/Schedule";
import Layout from "./Layout";

// const contextOptions = {
//   baseUrl: "https://auth.lumi.build",
//   clientId: "a2232153-71a3-4b40-a026-4d6051b47564",
//   // appId: "[YOUR_APP_ID]",
// };
const contextOptions: ContextOptions = {
  baseUrl: "https://auth.lumi.build",
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
  // console.log("fronteggApp", fronteggApp.getEntitlementsFromStore());
  return (
    <FronteggStoreProvider
      app={fronteggApp}
      contextOptions={contextOptions}
      // entitlementsOptions={{ enabled: true }}
    >
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/mobileEncounterDetails/:encounter_id_params"
                element={
                  <EncounterDetails
                    topBarInputs={{}}
                    storedParams={{}}
                    restrictTemplates={false}
                    searchFilters={{}}
                    schedulepage={false}
                  />
                }
              />
              <Route path="/mobileAppointments" element={<Appointments />} />
              <Route path="/schedule/:id" element={<Schedule />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </FronteggStoreProvider>
  );
}

export default App;
