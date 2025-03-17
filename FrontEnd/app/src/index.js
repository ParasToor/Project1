import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MyContextProvider } from "./MyContext";
import Form from "./components/Form";
import Create from "./components/Create";
import View from "./components/View";
import Update from "./components/Update";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import CreateRole from "./components/CreateRole";
import ViewRole from "./components/ViewRole";
import UpdateRole from "./components/UpdateRole";
import RoleWrapper from "./components/RoleWrapper";
import Home from "./components/Home";
import ViewUser from "./components/ViewUser";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import AccountWrapper from "./components/AccountWrapper";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Form />,
  },
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Outlet />,
            children: [
              {
                path: "/",
                element: <View />,
              },
              {
                path: "/config/create",
                element: <Create />,
              },
              {
                path: "/config/update",
                element: <Update />,
              },
            ],
          },
          {
            path: "/roles",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <ViewRole />,
              },
              {
                path: "create",
                element: <CreateRole />,
              },
              {
                path: "update",
                element: <UpdateRole />,
              },
            ],
          },
          {
            path: "/accounts",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <ViewUser />,
              },
              {
                path: "create",
                element: <CreateUser />,
              },
              {
                path: "update",
                element: <UpdateUser />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyContextProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </MyContextProvider>
);
