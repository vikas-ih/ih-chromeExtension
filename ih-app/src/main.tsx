import ReactDOM from "react-dom/client";
import { FronteggProvider } from "@frontegg/react";

import "./index.css";
import App from "./App.tsx";

const contextOptions = {
  baseUrl: "https://auth.lumi.build",
  clientId: "a2232153-71a3-4b40-a026-4d6051b47564",
  appId: "5597c702-9c72-4643-aed8-029f27283aa9",
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
