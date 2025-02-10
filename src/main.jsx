import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";


import Dashboard from "./components/pages/dashboard/Dashboard";
import CreateTrip from "./components/pages/create-trip/CreateTrip";
import ViewTrip from "./components/pages/view-trip/[tripID]";
import MyTrips from "./components/pages/my-trips";
import MyProfile from "./components/pages/my-profile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "create-trip",
        element: <CreateTrip />,
      },
      {
        path: "view-trip/generated",
        element: <ViewTrip />,
      },
      {
        path: "view-trip/:tripID",
        element: <ViewTrip />,
      },
      {
        path: "my-trips",
        element: <MyTrips />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
