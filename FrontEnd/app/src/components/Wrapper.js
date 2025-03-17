import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import axios from "axios";

const Wrapper = () => {
  const navigate = useNavigate();

  const { token } = useContext(MyContext);

  const verifyFunction = async () => {
    try {
      if (!token) {
        navigate("/login");
      }

      const verifyResult = await axios.post("http://localhost:8000/v1/verify", {
        headers: { Authorization: token },
      });
      
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyFunction();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Wrapper;
