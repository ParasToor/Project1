import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";

// const { token } = useContext(MyContext);

// const backend = axios.create({
//     baseURL: 'http://localhost:8000/v1/',
//     headers:{
//         headers: { Authorization: token }
//     }
// })


export const axiosHandler = async (method, resource, token, data = null) => {
  try {
    console.log("this is axios handler functio");

    const response = await axios({
      method: method,
      url: `http://localhost:8000/v1/${resource}`,
      headers: { Authorization: token },
      data: data,
    });

    console.log("response - ", response);
    return response;
  } catch (err) {
    if(err.status)
    console.log("Error reported in axios Handler from backend  - ", err);

  }
};

// module.exports = { axiosHandler };
