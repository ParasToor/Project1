import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./View.css";
import { MyContext } from "../MyContext";

const ViewUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { logout, globalPermiArray, token } = useContext(MyContext);

  const createPageHandler = () => {
    navigate("/accounts/create");
  };

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const fetchUsers = async () => {
    try {
      const apiData = await axios.get("http://localhost:8000/v1/users", {
        headers: { Authorization: token },
      });

      console.log("apiData.data.sqlData - ", apiData.data.sqlData);

      setUsers(apiData.data.sqlData);
    } catch (err) {
      console.log("Error from view axios call - ", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onUpdate = (user) => {
    console.log("user: ", user);
    navigate(`/accounts/update`, { state: user });
  };

  const onDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/v1/users/${userId}`,{
          headers: { Authorization: token },
        });
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        console.log("Error from delete axios call - ", err);
      }
    }
  };

  return (
    <div className="viewBody">
      <div className="homePageButtonsContainer">
        {globalPermiArray.includes("Account Write") && (
          <button onClick={createPageHandler} className="createPageBtn">
            Create New User
          </button>
        )}
        <br />
        <button onClick={logoutHandler} className="viewPageBtn">
          Log Out
        </button>
      </div>
      <table>
        <thead>
          <tr className="headingContainer">
            {/* <th>ID</th> */}
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            {globalPermiArray.includes(
              "Account Update" || "Account Delete"
            ) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                {/* <td>{user.id}</td> */}
                <td>{user.email}</td>
                <td>{user["roles.name"]}</td>
                <td>
                  {user["roles.permissions"].map((singlePermi, index) => (
                    <span key={index}>{singlePermi} ,</span>
                  ))}
                </td>
                {/* <td>
                  {Object.entries(user.permissions).map(([key, value]) => (
                    <span key={key}> {value.toString()} , </span>
                  ))}
                </td> */}
                {globalPermiArray.includes(
                  "Account Update" || "Account Delete"
                ) && (
                  <td style={{ display: "flex" }}>
                    {globalPermiArray.includes("Account Update") && (
                      <button
                        className="updateBtn"
                        onClick={() => onUpdate(user)}
                      >
                        Update
                      </button>
                    )}
                    {globalPermiArray.includes("Account Delete") && (
                      <button
                        className="updateBtn"
                        onClick={() => onDelete(user.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;
