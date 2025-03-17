import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Home.css";
import { MyContext } from "../MyContext";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { token, globalPermiArray, setGlobalPermiArray } =
    useContext(MyContext);

  async function permiFunction() {
    try {
      if (globalPermiArray.length === 0) {
        const permisResult = await axios.post(
          "http://localhost:8000/v1/permis",
          {
            headers: { Authorization: token },
          }
        );
        setGlobalPermiArray(permisResult.data.permiArray);
      }
    } catch (err) {
      console.log("Error from checking the permissions");
      console.log(err);
    }
  }


  useEffect(() => {
    permiFunction();
  }
  , [globalPermiArray]
);

  return (
    <div className="homeBody">
      <div className="sidebar">
        <ul className="itemList">
          {globalPermiArray.includes("Config Read") && (
            <NavLink className="links" to="/">
              Configurations
            </NavLink>
          )}

          {globalPermiArray.includes("Roles Read") && (
            <NavLink className="links" to="/roles">
              Roles
            </NavLink>
          )}

          {globalPermiArray.includes("Account Read") && (
            <NavLink className="links" to="/accounts">
              Accounts
            </NavLink>
          )}
        </ul>
      </div>
      <div className="display">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
