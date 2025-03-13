import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import "./Form.css";

const CreateRole = () => {
  const { token } = useContext(MyContext);

  // const {control , handleSubmit , setError,
  //     formSta
  // }

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const clickHandler = async (data) => {
    try {
      const result = await axios.post("http://localhost:8000/createRole", {
        data,
        headers: { Authorization: token },
      });

      console.log("Result from backEnd to create role - ", result);

      navigate("/roles");
    } catch (err) {
      console.log("Error from backEnd while creating Role - ", err);

      const errorArray = err.response.data.errors;

      errorArray.map((err) => {
        setError(err.path, {
          type: "manual",
          message: err.msg,
        });
      });
    }
  };

  const options = [
    { value: "Config Read", label: "Config Read" },
    { value: "Config Write", label: "Config Write" },
    { value: "Config Delete", label: "Config Delete" },
    { value: "Config Update", label: "Config Update" },
    { value: "Roles Read", label: "Roles Read" },
    { value: "Roles Write", label: "Roles Write" },
    { value: "Roles Delete", label: "Roles Delete" },
    { value: "Roles Update", label: "Roles Update" },
    { value: "Account Read", label: "Account Read" },
    { value: "Account Write", label: "Account Write" },
    { value: "Account Delete", label: "Account Delete" },
    { value: "Account Update", label: "Account Update" },
  ];

  return (
    <>
      <div className="formBody">
        <div className="container">
          <h1>Create a Role</h1>

          <div className="input-box">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name of the role is required",
              }}
              render={({ field }) => (
                <div>
                  {/* <label>Name : </label> */}
                  <input
                    className="inputFields"
                    {...field}
                    type="text"
                    placeholder="Role Name"
                  />
                </div>
              )}
            />
            {errors.name && <p className="err-msg">{errors.name.message}</p>}
          </div>

          <div className="input-boxNew">
            <Controller
              name="permissions"
              control={control}
              rules={{
                required: "Permissions to assign are required",
              }}
              render={({ field }) => (
                <Select
                  className="inputFieldsNew"
                  {...field}
                  options={options}
                  isMulti={true}
                />
              )}
            />
            {errors.permissions && (
              <p className="err-msg">{errors.permissions.message}</p>
            )}
          </div>

          <button className="btn" onClick={handleSubmit(clickHandler)}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateRole;
