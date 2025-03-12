import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

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
    <>
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Name of the role is required",
        }}
        render={({ field }) => (
          <div>
            <label>Name : </label>
            <input {...field} type="text" placeholder="name" />
          </div>
        )}
      />
      {errors.name && <p className="err-msg">{errors.name.message}</p>}

      <Controller
        name="permissions"
        control={control}
        rules={{
          required: "Permissions to assign are required",
        }}
        render={({ field }) => (
          <Select {...field} options={options} isMulti={true} />
        )}
      />
      {errors.permissions && (
        <p className="err-msg">{errors.permissions.message}</p>
      )}

      <button onClick={handleSubmit(clickHandler)}>Submit</button>
    </>
  );
};

export default CreateRole;
