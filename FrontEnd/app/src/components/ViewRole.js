import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import "./View.css";
const ViewRole = () => {
  const { logout, token, globalPermiArray, axiosHandler } =
    useContext(MyContext);
  const [rolesArray, setRolesArray] = useState([]);
  const [bool, setBool] = useState(true);

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const axiosCall = async () => {
    const response = await axiosHandler("get", "roles", token);

    if (response !== undefined) {
      setRolesArray(response.data.data);
    }

    // try {
    //   const apiData = await axios.get("http://localhost:8000/v1/roles", {
    //     headers: { Authorization: token },
    //   });

    //   // console.log(apiData.data.data);

    //   setRolesArray(apiData.data.data);
    // } catch (err) {
    //   console.log("Error from back end on view roles - ", err);
    // }
  };

  function updateHandler(singleData) {
    navigate("/roles/update", { state: singleData });
  }

  async function deleteHandler(singleData) {
    const response = await axiosHandler(
      "delete",
      "roles",
      token,
      null,
      singleData.id
    );

    if (bool) {
      setBool(false);
    } else {
      setBool(true);
    }

    // try {
    //   // console.log("The data you want to delete - ", singleData);
    //   const result = await axios.delete(
    //     `http://localhost:8000/v1/roles/${singleData.id}`,
    //     {
    //       headers: { Authorization: token },
    //     }
    //   );

    // if (bool) {
    //   setBool(false);
    // } else {
    //   setBool(true);
    // }
    // } catch (err) {
    //   console.log("error deleting one role - ", err);
    // }
  }

  useEffect(() => {
    axiosCall();
  }, [bool]);

  const createRoleHandler = () => {
    navigate("/roles/create");
  };

  return (
    <div className="viewBody">
      <div className="homePageButtonsContainer">
        {globalPermiArray.includes("Roles Write") && (
          <button onClick={createRoleHandler} className="createPageBtn">
            Create a role
          </button>
        )}
        <br />
        <button onClick={logoutHandler} className="viewPageBtn">
          Log Out
        </button>
      </div>
      <table>
        <thead>
          <tr className="headingContainer">
            <th>Name</th>
            <th>Permissions</th>
            {globalPermiArray.includes("Roles Update" || "Roles Delete") && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rolesArray.length === 0 ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            rolesArray.map((one, index) => (
              <tr key={index}>
                {/* <p>Name : </p> */}
                <td>{one.name}</td>
                {/* Need to uncomment this */}
                <td>
                  {one.permissions.map((singlePermi, index) => (
                    <span key={index}>{singlePermi} ,</span>
                  ))}
                </td>
                <td style={{ display: "flex" }}>
                  {globalPermiArray.includes("Roles Update") && (
                    <button
                      className="updateBtn"
                      onClick={() => updateHandler(one)}
                    >
                      Update
                    </button>
                  )}

                  {globalPermiArray.includes("Roles Delete") && (
                    <button
                      className="updateBtn"
                      onClick={() => deleteHandler(one)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRole;
