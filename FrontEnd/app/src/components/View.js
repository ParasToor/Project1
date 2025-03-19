import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import "./View.css";
import { MyContext } from "../MyContext";

const View = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);

  const [configBool, setConfigBool] = useState(true);

  const { logout, globalPermiArray, token, axiosHandler } =
    useContext(MyContext);

  const createPageHandler = () => {
    navigate("/config/create");
  };

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const axiosCall = async () => {
    const response = await axiosHandler("get", "configs", token);

    if (response !== undefined) {
      setArray(response.data.sqlData);
    }
  };

  async function onDelete(singleData) {
    console.log("Del buttonm clicked");

    const response = await axiosHandler(
      "delete",
      "configs",
      token,
      null,
      singleData.id
    );

    if (configBool) {
      setConfigBool(false);
    } else {
      setConfigBool(true);
    }

    // try {
    //   console.log(singleData);

    //   const delResult = await axios.delete(
    //     `http://localhost:8000/v1/configs/${singleData.id}`,
    //     {
    //       headers: { Authorization: token },
    //     }
    //   );

    // if (configBool) {
    //   setConfigBool(false);
    // } else {
    //   setConfigBool(true);
    // }
    // } catch (err) {
    //   console.log("Error in on Delete rfom backend - ", err);
    // }
  }

  useEffect(() => {
    axiosCall();
  }, [configBool]);

  function onUpdate(singleData) {
    navigate(`/config/update`, { state: singleData });
  }

  return (
    <>
      <div className="viewBody">
        <div className="homePageButtonsContainer">
          {globalPermiArray.includes("Config Write") && (
            <button onClick={createPageHandler} className="createPageBtn">
              Create Configurations
            </button>
          )}
          <br />
          <button onClick={logoutHandler} className="createPageBtn">
            Log Out
          </button>
        </div>
        <div className="viewContainer">
          <table>
            <thead>
              <tr className="headingContainer">
                <th>ip_address</th>
                <th>port</th>
                <th>hostname</th>
                <th>protocol</th>
                <th>base_url</th>
                <th>api_endpoint</th>
                <th>username</th>
                <th>password</th>
                <th>access_token</th>
                <th>api_key</th>
                <th>client_id</th>
                <th>client_secret</th>
                <th>encryption_key</th>
                <th>cert_path</th>
                <th>db_host</th>
                <th>db_port</th>
                <th>db_name</th>
                <th>db_username</th>
                <th>db_password</th>
                <th>state</th>
                {globalPermiArray.includes(
                  "Config Update" || "Config Delete"
                ) && <th>Actions</th>}
              </tr>
            </thead>
            {array.length !== 0 && (
              <tbody>
                {array.map((singleData, index) => (
                  <tr key={index}>
                    <td>
                      <p>{singleData.ip_address}</p>
                    </td>
                    <td>
                      <p>{singleData.port}</p>
                    </td>
                    <td>
                      <p>{singleData.hostname}</p>
                    </td>
                    <td>
                      <p>{singleData.protocol}</p>
                    </td>
                    <td>
                      <p>{singleData.base_url}</p>
                    </td>
                    <td>
                      <p>{singleData.api_endpoint}</p>
                    </td>
                    <td>
                      <p>{singleData.username}</p>
                    </td>
                    <td>
                      <p>{singleData.password}</p>
                    </td>
                    <td>
                      <p>{singleData.access_token}</p>
                    </td>
                    <td>
                      <p>{singleData.api_key}</p>
                    </td>
                    <td>
                      <p>{singleData.client_id}</p>
                    </td>
                    <td>
                      <p>{singleData.client_secret}</p>
                    </td>
                    <td>
                      <p>{singleData.encryption_key}</p>
                    </td>
                    <td>
                      <p>{singleData.cert_path}</p>
                    </td>
                    <td>
                      <p>{singleData.db_host}</p>
                    </td>
                    <td>
                      <p>{singleData.db_port}</p>
                    </td>
                    <td>
                      <p>{singleData.db_name}</p>
                    </td>
                    <td>
                      <p>{singleData.db_username}</p>
                    </td>
                    <td>
                      <p>{singleData.db_password}</p>
                    </td>
                    <td>
                      <p>{singleData.active ? "Enabled" : "Disabled"}</p>
                    </td>
                    {globalPermiArray.includes(
                      "Config Update" || "Config Delete"
                    ) && (
                      <td style={{ display: "flex" }}>
                        {globalPermiArray.includes("Config Update") && (
                          <button
                            className="updateBtn"
                            onClick={() => onUpdate(singleData)}
                          >
                            Update
                          </button>
                        )}
                        {globalPermiArray.includes("Config Delete") && (
                          <button
                            className="updateBtn"
                            onClick={() => onDelete(singleData)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default View;
