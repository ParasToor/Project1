import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { MyContext } from "../MyContext";

const Home = () => {

  const{logout} = useContext(MyContext);

  const createPageHandler = () => {
    navigate("/create");
  };

  const viewPageHandler = () => {
    navigate("/view");
  };

  const logoutHandler = ()=>{
    logout();
    navigate("/login");
  }

  const navigate = useNavigate();

  return (
    <div className="homeBody">
      <div className="homePageButtonsContainer">
        <button onClick={createPageHandler} className="createPageBtn">
          {" "}
          Create Page{" "}
        </button>
        <br />
        <button onClick={viewPageHandler} className="viewPageBtn">
          {" "}
          View Page{" "}
        </button>
        <br/>
        <button onClick={logoutHandler} className="viewPageBtn">
          {" "}
          Log Out{" "}
        </button>
        {/* <br/>
        <button onClick={logoutHandler} className="updateBtn">
          logout
        </button> */}
      </div>
    </div>
  );
};

export default Home;
