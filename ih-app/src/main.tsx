import ReactDOM from "react-dom/client";
import { FronteggProvider } from "@frontegg/react";

import "./index.css";
import App from "./App";

const contextOptions = {
  baseUrl: "https://app-jabl76n0368q.frontegg.com",
  clientId: "c5c45429-71e8-4c53-9c62-5bd33aeaab0f",
  appId: "201597ba-bc17-4d76-ba3b-c1e82dc8b7fc",
};
const authOptions = {
  keepSessionAlive: true,
  enableSessionPerTenant: true,
  disableSilentRefresh: true,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FronteggProvider
    contextOptions={contextOptions}
    // if you are using hosted login box change the value of hostedLoginBox to true
    hostedLoginBox={false}
    entitlementsOptions={{ enabled: true }}
    authOptions={authOptions}
  >
    <App />
  </FronteggProvider>
);
