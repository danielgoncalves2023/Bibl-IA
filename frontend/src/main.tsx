import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN || "";
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID || "";
// const audience =
//   import.meta.env.VITE_APP_AUTH0_AUDIENCE || "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
