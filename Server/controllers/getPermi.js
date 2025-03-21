const jwt = require("jsonwebtoken");
const pool = require("../database/database");
const Role = require("../models/RoleModel");
require("dotenv").config();

exports.getPermiHandler = async (req, res) => {
  try {
    const token = req.body.headers.Authorization;

    const decripted = jwt.verify(token, process.env.JWT_KEY);

    const roleId = decripted.roleId;

    const permiResult = await Role.findOne({
      where: { id: roleId },
      raw: true,
    });


    // const permiResult = await pool.query(
    //   `SELECT * FROM roles WHERE id=${roleId}`
    // );

    return res.status(200).json({
      success: true,
      permiArray: permiResult.permissions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Error in get Permi Handler",
    });
  }
};
