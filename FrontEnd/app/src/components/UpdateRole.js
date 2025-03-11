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
        id:prevData.id,
        newData,
      });

      navigate("/viewroles");

    } catch (err) {

      console.log("Error from backend on updating - ", err);

    }
  };

  const options = [
    { value: "read", label: "Read" },
    { value: "write", label: "Write" },
    { value: "delete", label: "Delete" },
    { value: "update", label: "Update" },
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
