const { validationResult } = require("express-validator");
const pool = require("../database/database");
const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginHandler = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Errors sent from backen ",
        errors: errors.array(),
      });
    }

    const { email, password } = req.query;

    const findUser = await User.findOne({
      where: { email: email },
      raw: true,
    });

    // console.log("User found by sequelize - ", findUser);

    if (!findUser) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exists",
        errors: [
          {
            type: "field",
            value: "",
            msg: "User not found",
            path: "email",
            location: "query",
          },
        ],
      });
    }

    const databasePassword = findUser.password;

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

    const roleId = findUser.role_id;

    if (!roleId) {
      return res.status(400).json({
        success: false,
        message: "Error in login handler as the role id was not found",
        errors: [
          {
            type: "field",
            value: "",
            msg: "This account is not assigned with any role.",
            path: "password",
            location: "query",
          },
        ],
      });
    }

    // const roleResult = await pool.query(
    //   `SELECT * FROM roles WHERE id=${roleId}`
    // );

    const roleResult = await Role.findOne({
      where: { id: roleId },
      raw: true,
    });

    // console.log("Data from roles table - ",roleResult);

    if (!roleResult) {
      return res.status(400).json({
        success: false,
        message:
          "Error in login handler as the permissions were not retreived from back end",
        errors: [
          {
            type: "field",
            value: "",
            msg: "No entry for this user",
            path: "password",
            location: "query",
          },
        ],
      });
    }

    const permis = roleResult.permissions;

    if (!permis) {
      return res.status(400).json({
        success: false,
        message:
          "Error in login handler as the permissions were not retreived from back end",
        errors: [
          {
            type: "field",
            value: "",
            msg: "This user doesn't have permissions",
            path: "password",
            location: "query",
          },
        ],
      });
    }

    const role = roleResult.name;

    const payload = {
      email: email,
      id: findUser.id,
      role: role,
      roleId: roleId,
      permissions: permis,
    };

    let token = jwt.sign(payload, process.env.JWT_KEY);

    res.status(200).json({
      success: true,
      jwtToken: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      error: err.message,
    });
  }
};
