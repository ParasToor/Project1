import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewRole = () => {
  const [rolesArray, setRolesArray] = useState([]);
  const [bool,setBool] = useState(true);

  const navigate = useNavigate();

  const axiosCall = async (req, res) => {
    try {
      const apiData = await axios.post("http://localhost:8000/viewRoles");

      console.log(apiData.data.data);

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

      if(bool){
        setBool(false);
      }
      else{
        setBool(true);
      }
    } catch (err) {
      console.log("error deleting one role - ", err);
    }
  }

  useEffect(() => {
    axiosCall();
  },[bool]);

  const createRoleHandler = () => {
    navigate("/roles/create");
  };

  return (
    <div>
      <div>
        <button onClick={createRoleHandler}>Create a role</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>update</th>
          </tr>
        </thead>

        {rolesArray.length === 0 ? (
          <h1>Loading ....</h1>
        ) : (
          <tbody>
            {rolesArray.map((one, index) => (
              <div key={index}>
                <tr>
                  {/* <p>Name : </p> */}
                  <td>
                    {one.name}
                  </td>
                  {/* <p>Permissions: </p> */}
                  <td>
                    {one.permissions.map((singlePermi, index) => (
                      <div key={index}>{singlePermi}</div>
                    ))}
                  </td>
                  <td>
                    <div>
                      <button onClick={() => updateHandler(one)}>Update</button>
                    
                      <button onClick={() => deleteHandler(one)}>Delete</button>
                    </div>
                  </td>
                </tr>
              </div>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ViewRole;
