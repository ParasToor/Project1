import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MyContextProvider } from "./MyContext";
import Form from "./components/Form";
import Create from "./components/Create";
import View from "./components/View";
import Update from "./components/Update";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import CreateRole from "./components/CreateRole";
import ViewRole from "./components/ViewRole";
import UpdateRole from "./components/UpdateRole";
import RoleWrapper from "./components/RoleWrapper";

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
        element: <View />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
      {
        path: "/roles",
        element: <RoleWrapper />,
        children: [
          {
            path: "/roles",
            element: <ViewRole />,
          },
          {
            path: "/roles/create",
            element: <CreateRole />,
          },
          {
            path: "/roles/update",
            element: <UpdateRole />,
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
