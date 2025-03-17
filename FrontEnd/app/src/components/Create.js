import React, { useContext } from "react";
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

  const { control, handleSubmit, setError } = useForm();

  async function clickHandler(data) {
    try {
<<<<<<< Updated upstream
      const apiData = await axios.post(
        "http://localhost:8000/v1/configs",
        {
          data,
        },
        {
          headers: { Authorization: token },
        }
      );
=======
      const apiData = await axios.post("http://localhost:8000/create", {
        data,
        headers: { Authorization: token },
      });
>>>>>>> Stashed changes

      console.log("data from axios create call - ", apiData);
      navigate("/");
    } catch (err) {
      
      if (err.response && err.response.data.errors) {
        err.response.data.errors.forEach((error) => {
          console.log('path',error.path);
          setError(error.path, {
            type: "manual",
            message: error.message,
          });
        });
      } else {
        console.log("Error from axios create - ", err);
        setError("apiError", { message: err.response?.data?.message || err.message });
    
      }
    }
  }

  return (
    <div className="createBody">
      <div className="createCard">
        <div className="createContainer">
          {configFields.map((one, index) => (
            <div key={index} className="createItem">
              <Controller
                name={one}
                control={control}
                // rules={{
                //   required: `${one} is required`,
                // }}
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
                        <label htmlFor="Enable">Enable</label>
                        <span> </span>
                        <input
                          {...field}
                          type="radio"
                          id="Disable"
                          value={false}
                        />
                        <label htmlFor="Disable">Disable</label>
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
