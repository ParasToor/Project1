import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "./Update.css";
import { MyContext } from "../MyContext";

const Update = () => {
  const { token ,axiosHandler } = useContext(MyContext);

  const navigate = useNavigate();

  const location = useLocation();
  const prevData = location.state || {};
  const id = prevData.id;

  const configFields = [
    "ip_address",
    "hostname",
    "port",
    "protocol",
    "base_url",
    "api_endpoint",
    "username",
    "password",
    "access_token",
    "api_key",
    "client_id",
    "client_secret",
    "encryption_key",
    "cert_path",
    "db_host",
    "db_port",
    "db_name",
    "db_username",
    "db_password",
    "active",
  ];

  async function clickHandler(data) {

    data.id = id;

    const response = await axiosHandler("patch","configs",token , data);

    if(response !== undefined){
      navigate("/");
    }


    // try {
    //   console.log(data);

    //   const apiData = await axios.patch(
    //     "http://localhost:8000/v1/configs",
    //     {
    //       id,
    //       data,
    //     },
    //     {
    //       headers: { Authorization: token },
    //     }
    //   );

    //   console.log("data from axios update call - ", apiData);

    //   navigate("/");
    // } catch (err) {
    //   console.log("Error in update fropm axios Patch - ", err);
    // }
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ip_address: `${prevData?.ip_address || ""}`,
      hostname: `${prevData?.hostname || ""}`,
      port: `${prevData?.port || ""}`,
      protocol: `${prevData?.protocol || ""}`,
      base_url: `${prevData?.base_url || ""}`,
      api_endpoint: `${prevData?.api_endpoint || ""}`,
      username: `${prevData?.username || ""}`,
      password: `${prevData?.password || ""}`,
      access_token: `${prevData?.access_token || ""}`,
      api_key: `${prevData?.api_key || ""}`,
      client_id: `${prevData?.client_id || ""}`,
      client_secret: `${prevData?.client_secret || ""}`,
      encryption_key: `${prevData?.encryption_key || ""}`,
      cert_path: `${prevData?.cert_path || ""}`,
      db_host: `${prevData?.db_host || ""}`,
      db_port: `${prevData?.db_port || ""}`,
      db_name: `${prevData?.db_name || ""}`,
      db_username: `${prevData?.db_username || ""}`,
      db_password: `${prevData?.db_password || ""}`,
      active: `${prevData?.active || ""}`,
    },
  });

  async function verifyFunction() {
    try {
      const verifyResult = await axios.post("http://localhost:8000/verify", {
        headers: { Authorization: token },
      });
    } catch (err) {
      console.log("Error in verifying in create Page - ", err);
    }
  }

  useEffect(() => {
    verifyFunction();
  }, []);

  return (
    <div className="updateBody">
      <div className="updateCard">
        <div className="updateContainer">
          {configFields.map((one, index) => (
            <div key={index} className="updateItem">
              <Controller
                name={one}
                control={control}
                render={({ field }) => (
                  <div>
                    <div>
                      <label>{one}:</label>
                      <br />
                      {one === "db_name" ? (
                        <select {...field} className="updateInputFields">
                          <option value="" disabled selected>
                            {one || "Select an option"}
                          </option>
                          <option value="config">config</option>
                          <option value="users">user</option>
                        </select>
                      ) : one === "active" ? (
                        <div>
                          <input
                            {...field}
                            type="radio"
                            id="Enable"
                            value={true}
                          />
                          <label for="Enable">Enable</label>
                          <span> </span>
                          <input
                            {...field}
                            type="radio"
                            id="Disable"
                            value={false}
                          />
                          <label for="Disable">Disable</label>
                        </div>
                      ) : (
                        <input
                          {...field}
                          className="updateInputFields"
                          type="text"
                          placeholder={one}
                        />
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
        <div className="updateBtnContainer">
          <br />
          <button
            className="updateBtn"
            type="submit"
            onClick={handleSubmit(clickHandler)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
