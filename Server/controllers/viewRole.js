const pool = require("../database/database");
const Role = require("../models/RoleModel");

exports.viewRoleHandler = async (req, res) => {
  try {

    console.log("Viewing roles");

    // const dataBaseResult = await pool.query("SELECT * FROM roles");

    const dataBaseResult = await Role.findAll({
      raw: true,
    });


    res.status(200).json({
      success: true,
      data: dataBaseResult,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inside ciew Role Handler.",
      error: err.message,
    });
  }
};
