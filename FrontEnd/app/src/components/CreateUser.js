import { useForm, Controller } from "react-hook-form";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export default function CreateUser() {

  const { token } = useContext(MyContext);

  const [fetchdata, setfetchdata] = useState([]);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function fetchRole() {
    // console.log("fetch for the role call");
    try {
      const apiData = await axios.get("http://localhost:8000/v1/fetchrole");

      console.log("data from the axios call", apiData);

      setfetchdata(apiData.data.data);
    } catch (err) {
      console.log("Error from backend", err);
      setError("apiError", {
        message: err.response?.data?.message || err.message,
      });
    }
  }

  async function clickHandler(data) {
    try {
      const apiData = await axios.post(
        "http://localhost:8000/v1/users",
        {
          data,
        },
        {
          headers: { Authorization: token },
        }
      );

      navigate("/accounts");
    } catch (err) {
       if(err.response && err.response.data.errors){
        err.response.data.errors.forEach((error)=>{
          setError(error.path,{type:"mannual",message:error.message})
        })
       }
      console.log("Error from axios create User -", err);

      setError("apiError", {
        message: err.response?.data?.message || err.message,
      });
    }
  }

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <>
      <div className="formBody">
        <div className="container">
          <h1> Create User</h1>
          <div className="input-box">
            <Controller
              name="userName"
              control={control}
              rules={{
                required: 'Username is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._]{6,20}$/,
                  message: 'Username must be more than 6  characters long and can only contain letters, numbers, underscores, and dots.',
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Username"
                  className="inputFields"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("apiError");
                  }}
                />
              )}
            />

            {errors.userName && (
              <p className="err-msg">{errors.userName.message}</p>
            )}
          </div>
          <div className="input-box">
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required.',
                 minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must include uppercase, lowercase, number, and special character.',
                },
              }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="Password"
                  className="inputFields"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("apiError");
                  }}
                />
              )}
            />

            {errors.password && (
              <p className="err-msg">{errors.password.message}</p>
            )}
          </div>

          <div className="input-box">
            <Controller
              name="role"
              control={control}
              rules={{
                required: "Role is required.",
              }}
              render={({ field }) => (
                <select
                  className="inputFields"
                  {...field}
                  style={{
                    display: "block",
                    margin: "0px",
                    padding: "15px",
                    paddingRight: "20px",
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("apiError");
                  }}
                >
                  <option value="" style={{ width: "80%" }}>
                    Select Role
                  </option>
                  {fetchdata.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              )}
            />

            {errors.role && <p className="err-msg">{errors.role.message}</p>}
          </div>
          {errors.apiError && (
            <p className="err-msg">{errors.apiError.message}</p>
          )}

          <button
            onClick={handleSubmit(clickHandler)}
            className="btn"
            type="submit"
          >
            Create User
          </button>
        </div>
      </div>
    </>
  );
}
