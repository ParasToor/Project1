import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import "./Update.css";

const UpdateUser = () => {
  const [fetchdata, setfetchdata] = useState([]);
  const navigate = useNavigate();
  const { login, token, axiosHandler } = useContext(MyContext);
  // const { id } = useParams();

  const location = useLocation();

  // console.log('value of location', location);

  const prevData = location.state || {};
  const id = prevData.id;

  console.log("Previous data which is to be updated- ", prevData);

  async function fetchRole() {
    console.log("fetch for the role call");
    try {
      const apiData = await axios.get("http://localhost:8000/v1/fetchrole");
      //   console.log("data from the axios call", apiData);

      setfetchdata(apiData.data.data);
    } catch (err) {
      console.log("Error from backend", err);
    }
  }

  const userFields = ["email", "newPassword", "role"];

  async function clickHandler(data) {

    data.id = id;

    const response = await axiosHandler("patch", "users", token, data);

    if (response !== undefined) {
      navigate("/accounts");
    }

    // // console.log("click val");
    // try {
    //   //   console.log("data while clicking", data, id);
    //   const apiData = await axios.patch(
    //     "http://localhost:8000/v1/users",
    //     {
    //       id,
    //       data,
    //     },
    //     {
    //       headers: { Authorization: token },
    //     }
    //   );
    //   console.log("apidata");
    //   console.log("data from axios update call - ", apiData);

    //   navigate("/accounts");
    // } catch (err) {
    //   console.log("Error from axios create user", err);
    //   if (err.response || err.response.data || err.response.data.errors) {
    //     const backendErrors = err.response.data.message;
    //     console.log("error for the prining executed", backendErrors);

    //     setError("apiError", {
    //       message: backendErrors,
    //     });
    //   }
    // }
  }

  useEffect(() => {
    fetchRole();
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: `${prevData?.email || ""}`,
      newpassword: `${""}`,
      role: `${prevData?.role || ""}`,
    },
  });

  return (
    <div className="updateBody">
      <div className="updateCard">
        <h1> Update User </h1>
        <div className="updateContainer">
          {userFields.map((one, index) => (
            <div key={index} className="updateItem">
              <Controller
                name={one}
                control={control}
                rules={{
                  required:
                    one !== "newPassword" ? "This field is required" : false,
                }}
                render={({ field }) => (
                  <div>
                    {one === "role" ? (
                      <select
                        className="updateInputFields"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          clearErrors("apiError");
                        }}
                        style={{
                          display: "block",
                          margin: "0px",
                          padding: "15px",
                          paddingRight: "20px",
                        }}
                      >
                        <option value="" style={{ width: "80%" }}>
                          Select Role
                        </option>
                        {fetchdata.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          clearErrors("apiError");
                        }}
                        className="updateInputFields"
                        type="text"
                        placeholder={one}
                      />
                    )}
                    {errors[one] && (
                      <p className="error">{errors[one].message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
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
          {errors.apiError && (
            <p className="error">{errors.apiError.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
