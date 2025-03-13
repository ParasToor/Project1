import React, { useCallback, useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import "./Form.css";

const UpdateRole = () => {
  const { token } = useContext(MyContext);

  const navigate = useNavigate();

  const location = useLocation();
  const prevData = location.state || {};

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: `${prevData.name}`,
      permissions: `${prevData.permissions}`,
    },
  });

  const doUpdate = async (newData) => {
    try {
      const updateRes = await axios.patch("http://localhost:8000/updateRoles", {
        id: prevData.id,
        newData,
        headers: { Authorization: token },
      });

      navigate("/roles");
    } catch (err) {
      console.log("Error from backend on updating - ", err);
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
          <h1>Update Role</h1>
          <div className="input-box">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    className="inputFields"
                    {...field}
                    type="text"
                    placeholder="Role Name"
                  />
                </div>
              )}
            />
          </div>

          <div className="input-boxNew">
            <Controller
              name="permissions"
              control={control}
              render={({ field }) => (
                <Select
                  className="inputFieldsNew"
                  {...field}
                  options={options}
                  isMulti={true}
                />
              )}
            />
          </div>

          <button className="btn" onClick={handleSubmit(doUpdate)}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateRole;
