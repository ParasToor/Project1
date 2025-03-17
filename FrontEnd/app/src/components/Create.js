import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

const Create = () => {
  const { token } = useContext(MyContext);

  const navigate = useNavigate();

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
    try {
      const apiData = await axios.post(
        "http://localhost:8000/v1/configs",
        {
          data,
        },
        {
          headers: { Authorization: token },
        }
      );

      console.log("data from axios create call - ", apiData);

      navigate("/");
    } catch (err) {
      console.log("Error fropm axios create - ", err);
    }
  }

  const { control, handleSubmit, setError } = useForm();

  return (
    <div className="createBody">
      <div className="createCard">
        <div className="createContainer">
          {configFields.map((one, index) => (
            <div key={index} className="createItem">
              <Controller
                name={one}
                control={control}
                rules={{
                  required: `${one} is required`,
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <label>{one}: </label>
                    <br />

                    {one === "db_name" ? (
                      <select
                        {...field}
                        className="createInputFields createSelect"
                      >
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
                        className="createInputFields"
                        type="text"
                        placeholder={one}
                      />
                    )}
                    {error && <p className="err-msg"> {error.message} </p>}
                  </div>
                )}
              />
            </div>
          ))}
        </div>
        <div className="createBtnContainer">
          <br />
          <button
            type="submit"
            className="createBtn"
            onClick={handleSubmit(clickHandler)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
