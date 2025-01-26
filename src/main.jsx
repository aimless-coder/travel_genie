import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripID]";
import MyTrips from "./my-trips";
import Dashboard from "./dashboard/Dashboard";
import CreateTrip from "./create-trip/CreateTrip";
import Home from "./dashboard/Home";

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
        path: "home",
        element: <Home />,
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
  {
    path: "my-trips",
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
