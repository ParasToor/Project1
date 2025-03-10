import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import "./Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

const Form = () => {
  const navigate = useNavigate();

  const { login, token } = useContext(MyContext);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function clickHandler(data) {
    try {
      console.log("Data i am sendiong - ", data);
      const apiData = await axios.get("http://localhost:8000/login", {
        params: {
          userName: data.userName,
          password: data.password,
        },
      });

      console.log("Api Data - ", apiData.data.jwtToken);

      login(apiData.data.jwtToken);

      if (apiData.status === 200) {
        navigate("/");
      }
    } catch (err) {
      const error = err;
      console.log("Error from backend - ", error);

      const some = err.response.data.errors;
      if (some != undefined) {
        console.log("array of errors - ", some);

        some.map((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          });
        });
      }
    }
  }

  const verifyFunction = async () => {
    try {
      console.log("Verification function is working.");
      if (!token) {
        navigate("/login");
      }

      const verifyResult = await axios.post("http://localhost:8000/verify", {
        token,
      });
      console.log("data from back end call to verify - ", verifyResult);
      navigate("/");
    } catch (err) {
      console.log("Error in verifying - ", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyFunction();
  }, []);

  return (
    <>
      <div className="formBody">
        <div className="container">
          <h1>Log In</h1>
          <div className="input-box">
            <Controller
              name="userName"
              control={control}
              rules={{
                required: "Username is required.",
              }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Username"
                  className="inputFields"
                  {...field}
                />
              )}
            />
            <FaUser className="icon" />
            {errors.userName && (
              <p className="err-msg"> {errors.userName.message} </p>
            )}
          </div>

          <div className="input-box">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="Password"
                  className="inputFields"
                  {...field}
                />
              )}
            />
            <FaLock className="icon" />
            {errors.password && (
              <p className="err-msg"> {errors.password.message} </p>
            )}
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button
            onClick={handleSubmit(clickHandler)}
            className="btn"
            type="submit"
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
