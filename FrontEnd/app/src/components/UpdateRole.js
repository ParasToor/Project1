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

      navigate("/viewroles");
    } catch (err) {
      console.log("Error from backend on updating - ", err);
    }
  };

  const options = [
    { value: "CR", label: "Config Read" },
    { value: "CW", label: "Config Write" },
    { value: "CD", label: "Config Delete" },
    { value: "CU", label: "Config Update" },
    { value: "RR", label: "Roles Read" },
    { value: "RW", label: "Roles Write" },
    { value: "RD", label: "Roles Delete" },
    { value: "RU", label: "Roles Update" },
    { value: "AR", label: "Account Read" },
    { value: "AW", label: "Account Write" },
    { value: "AD", label: "Account Delete" },
    { value: "AU", label: "Account Update" },
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
