import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewRole = () => {
  
  const [rolesArray, setRolesArray] = useState([]);

  const navigate = useNavigate();

  const axiosCall = async (req, res) => {
    try {
      const apiData = await axios.post("http://localhost:8000/viewRoles");

      setRolesArray(apiData.data.data);
    } catch (err) {
      console.log("Error from back end on view roles - ", err);
    }
  };

  function updateHandler(singleData) {
    // console.log("singleData: ", singleData);

    navigate(`/updateroles`, { state: singleData });
  }

  async function deleteHandler(singleData) {
    try {
      console.log("The data you want to delete - ", singleData);
      const result = await axios.delete("http://localhost:8000/deleteRoles", {
        data: { singleData },
      });
    } catch (err) {
      console.log("error deleting one role - ", err);
    }
  }

  useEffect(() => {
    axiosCall();
  });

  const createRoleHandler = ()=>{
    navigate("/roles/create");
  }


  return (
    <div>
      <div>
              <button onClick={createRoleHandler}>Create a role</button>
      </div>
      {rolesArray.length === 0 ? (
        <h1>Loading ....</h1>
      ) : (
        rolesArray.map((one, index) => (
          <div key={index}>
            <p>Name : </p>
            <p>{one.name}</p>
            <p>Permissions: </p>
            {one.permissions.map((singlePermi, index) => (
              <div key={index}>{singlePermi}</div>
            ))}
            <div>
              <button onClick={() => updateHandler(one)}>Update</button>
            </div>
            <div>
              <button onClick={() => deleteHandler(one)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewRole;
