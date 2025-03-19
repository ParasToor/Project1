import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [globalPermiArray, setGlobalPermiArray] = useState([]);

  // useEffect(()=>{
  //     if(globalPermiArray.length !== 0 ){
  //         localStorage.setItem("globalPermiArray",globalPermiArray);
  //     }
  //     else{
  //         localStorage.removeItem("globalPermiArray");
  //     }
  // },[globalPermiArray])

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const axiosHandler = async (
    method,
    resource,
    token,
    data = null,
    id = null
  ) => {
    try {
      console.log("this is axios handler functio - ", data);

      const response = await axios({
        method: method,
        url: `http://localhost:8000/v1/${resource}`,
        headers: { Authorization: token },
        data: data,
        params: { id: id },
      });

      console.log("response - ", response);
      return response;
    } catch (err) {
      if (err.status === 498) {
        setToken(null);
      }
      console.log("Error reported in axios Handler from backend  - ", err);
    }
  };

  const login = (jwtToken) => {
    setToken(jwtToken);
  };

  const logout = () => {
    setGlobalPermiArray([]);
    setToken(null);
  };

  return (
    <MyContext.Provider
      value={{
        token,
        login,
        logout,
        globalPermiArray,
        setGlobalPermiArray,
        axiosHandler,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// import { createContext, useState } from "react";

// // Create Context
// export const MyContext = createContext();

// // Create Provider Component
// export const MyProvider = ({ children }) => {

//     const

//   return (
//     <MyContext.Provider value={{ tokenVar, setTokenVar }}>
//       {children}
//     </MyContext.Provider>
//   );
// };
