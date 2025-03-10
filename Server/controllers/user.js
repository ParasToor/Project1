const { validationResult } = require("express-validator");
const pool = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log("express validator error - ", errors.array());
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Errors sent from backen ",
        errors: errors.array(),
      });
    }

    //data fetch
    const { userName, password } = req.query;

    console.log("data from req - ", req.query);

    //Validation
    // if (!userName || !password) {
    //   res.status(404).json({
    //     success: false,
    //     message: "require full data",

    //   });
    // }

    const findUser = await pool.query(
      `SELECT * FROM users WHERE email = '${userName}'`
    );

    console.log("findUser from dataBase - ", findUser);
    // console.log("length - ",findUser[0].length);

    if (findUser[0].length === 0) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exists",
        errors: [
          {
            type: "field",
            value: "",
            msg: "User not found",
            path: "userName",
            location: "query",
          },
        ],
      });
    }

    const databasePassword = findUser[0][0].password;

    const compareResult = await bcrypt.compare(
      `${password}`,
      `${databasePassword}`
    );

    if (!compareResult) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
        errors: [
          {
            type: "field",
            value: "",
            msg: "Incorrect Password",
            path: "password",
            location: "query",
          },
        ],
      });
    }

    const user = findUser[0][0];

    const payload = {
      userName: user.email,
      id: user.id,
    };

    let token = jwt.sign(payload, process.env.JWT_KEY);

    res.status(200).json({
      success: true,
      jwtToken: token,
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
