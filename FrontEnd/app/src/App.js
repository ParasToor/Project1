import React, { useContext, useState, Navigate } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Home from "./components/Home";
import Error from "./components/Error";
import Create from "./components/Create";
import View from "./components/View";
import Update from "./components/Update";
import { MyContext } from "./MyContext";

function App() {
  
  const navigate = useNavigate();

  const { token } = useContext(MyContext);

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
