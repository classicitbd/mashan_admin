import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import SettingProvider from "./context/SettingProvider.jsx";
import LocaleProvider from "./context/LocaleProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//import AuthProvider from "./context/AuthProvider.jsx";
//import SettingProvider from "./context/SettingProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingProvider>
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </SettingProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
