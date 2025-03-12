import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateRole = () => {
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

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <div>
            <label>Name : </label>
            <input {...field} type="text" placeholder="name" />
          </div>
        )}
      />

      <Controller
        name="permissions"
        control={control}
        render={({ field }) => (
          <Select {...field} options={options} isMulti={true} />
        )}
      />

      <button onClick={handleSubmit(doUpdate)}>Update</button>
    </>
  );
};

export default UpdateRole;
