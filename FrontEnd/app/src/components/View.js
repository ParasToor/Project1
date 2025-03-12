// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./View.css";
// import { MyContext } from "../MyContext";
// const View = () => {
//   const navigate = useNavigate();

//   const [array, setArray] = useState([]);

//   const { logout } = useContext(MyContext);

//   const createPageHandler = () => {
//     navigate("/create");
//   };

//   const logoutHandler = () => {
//     logout();
//     navigate("/login");
//   };

//   const rolesHandler = ()=>{
//     navigate("/viewroles")
//   }

//   const axiosCall = async () => {
//     try {
//       const apiData = await axios.get("http://localhost:8000/view");

//       console.log("data from axios view call - ", apiData.data.sqlData);
//       setArray(apiData.data.sqlData);
//     } catch (err) {
//       console.log("Error from view axios call - ", err);
//     }
//   };

//   useEffect(() => {
//     axiosCall();
//   }, []);

//   function onUpdate(singleData) {
//     console.log("singleData: ", singleData);

//     navigate(`/update/${singleData.id}`, { state: singleData });
//   }

//   return (
//     <div className="viewBody">
//       <div className="homePageButtonsContainer">
//         <button onClick={createPageHandler} className="createPageBtn">
//           Create Page
//         </button>

//         <br />
//         <button onClick={rolesHandler} className="viewPageBtn">
//           Roles
//         </button>

//         <br />
//         <button onClick={logoutHandler} className="viewPageBtn">
//           Log Out
//         </button>
//       </div>
//       <table>
//         <div className="viewContainer">
//           <thead>
//             <tr className="headingContainer">
//               {/* <div> */}
//               <th>ip_address:</th>
//               <th>port:</th>
//               <th>hostname:</th>
//               <th>protocol:</th>
//               <th>base_url:</th>
//               <th>api_endpoint:</th>
//               <th>username:</th>
//               <th>password:</th>
//               <th>access_token:</th>
//               <th>api_key:</th>
//               <th>client_id:</th>
//               <th>client_secret:</th>
//               <th>encryption_key:</th>
//               <th>cert_path:</th>
//               <th>db_host:</th>
//               <th>db_port:</th>
//               <th>db_name:</th>
//               <th>db_username:</th>
//               <th>db_password:</th>
//               <th>update</th>
//               {/* </div> */}
//             </tr>
//           </thead>

//           {array.length === 0 ? (
//             <h1>Loading ...</h1>
//           ) : (
//             <tbody>
//               {array.map((singleData, index) => (
//                 <tr key={index}>
//                   <td>
//                     <p>{singleData.ip_address}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.hostname}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.port}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.protocol}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.base_url}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.api_endpoint}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.username}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.password}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.access_token}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.api_key}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.client_id}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.client_secret}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.encryption_key}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.cert_path}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.db_host}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.db_port}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.db_name}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.db_username}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <p>{singleData.db_password}</p>
//                   </td>
//                   <td>
//                     {" "}
//                     <button
//                       className="updateBtn"
//                       onClick={() => onUpdate(singleData)}
//                     >
//                       Update
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           )}
//         </div>
//       </table>
//     </div>
//   );
// };

// export default View;

// ----------------------------------chatgpt--------------------------

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import "./View.css";
import { MyContext } from "../MyContext";

const View = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);

  const [configBool, setConfigBool] = useState(true);

  const { logout, globalPermiArray, token } = useContext(MyContext);

  const createPageHandler = () => {
    navigate("/config/create");
  };

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const axiosCall = async () => {
    try {
      const apiData = await axios.post("http://localhost:8000/view", {
        headers: { Authorization: token },
      });

      setArray(apiData.data.sqlData);
    } catch (err) {
      console.log("Error while gettiung permissions - ", err);
    }
  };

  // if (globalPermiArray.length === 0) {
  //   axiosCall();
  // }

  async function onDelete(singleData) {
    try {
      console.log(singleData);

      const delResult = await axios.delete(
        "http://localhost:8000/deleteConfig",
        {
          data: {
            id: singleData.id,
          },
        }
      );

      if (configBool) {
        setConfigBool(false);
      } else {
        setConfigBool(true);
      }

    } catch (err) {
      console.log("Error in on Delete rfom backend - ", err);
    }
  }

  useEffect(() => {
    axiosCall();
  }, [configBool]);

  function onUpdate(singleData) {
    navigate(`/config/update/${singleData.id}`, { state: singleData });
  }

  return (
    <>
      <div className="viewBody">
        <div className="homePageButtonsContainer">
          {globalPermiArray.includes("Config Write") && (
            <button onClick={createPageHandler} className="createPageBtn">
              Create Configurations
            </button>
          )}
          <br />
          <button onClick={logoutHandler} className="createPageBtn">
            Log Out
          </button>
        </div>
        <div className="viewContainer">
          <table>
            <thead>
              <tr className="headingContainer">
                <th>ip_address</th>
                <th>port</th>
                <th>hostname</th>
                <th>protocol</th>
                <th>base_url</th>
                <th>api_endpoint</th>
                <th>username</th>
                <th>password</th>
                <th>access_token</th>
                <th>api_key</th>
                <th>client_id</th>
                <th>client_secret</th>
                <th>encryption_key</th>
                <th>cert_path</th>
                <th>db_host</th>
                <th>db_port</th>
                <th>db_name</th>
                <th>db_username</th>
                <th>db_password</th>
                {globalPermiArray.includes("Config Update") && <th>update</th>}
              </tr>
            </thead>
            {array.length !== 0 && (
              //  ? (
              //   <p>Loading ...</p>
              // ) :
              <tbody>
                {array.map((singleData, index) => (
                  <tr key={index}>
                    <td>
                      <p>{singleData.ip_address}</p>
                    </td>
                    <td>
                      <p>{singleData.port}</p>
                    </td>
                    <td>
                      <p>{singleData.hostname}</p>
                    </td>
                    <td>
                      <p>{singleData.protocol}</p>
                    </td>
                    <td>
                      <p>{singleData.base_url}</p>
                    </td>
                    <td>
                      <p>{singleData.api_endpoint}</p>
                    </td>
                    <td>
                      <p>{singleData.username}</p>
                    </td>
                    <td>
                      <p>{singleData.password}</p>
                    </td>
                    <td>
                      <p>{singleData.access_token}</p>
                    </td>
                    <td>
                      <p>{singleData.api_key}</p>
                    </td>
                    <td>
                      <p>{singleData.client_id}</p>
                    </td>
                    <td>
                      <p>{singleData.client_secret}</p>
                    </td>
                    <td>
                      <p>{singleData.encryption_key}</p>
                    </td>
                    <td>
                      <p>{singleData.cert_path}</p>
                    </td>
                    <td>
                      <p>{singleData.db_host}</p>
                    </td>
                    <td>
                      <p>{singleData.db_port}</p>
                    </td>
                    <td>
                      <p>{singleData.db_name}</p>
                    </td>
                    <td>
                      <p>{singleData.db_username}</p>
                    </td>
                    <td>
                      <p>{singleData.db_password}</p>
                    </td>
                    {globalPermiArray.includes("Config Update") && (
                      <td style={{ display: "flex" }}>
                        <button
                          className="updateBtn"
                          onClick={() => onUpdate(singleData)}
                        >
                          Update
                        </button>
                        <button
                          className="updateBtn"
                          onClick={() => onDelete(singleData)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default View;
