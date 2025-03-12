import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../MyContext";

const AccountWrapper = () => {
  const { token } = useContext(MyContext);

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
    <div>
      <Outlet />
    </div>
  );
};

export default AccountWrapper;
