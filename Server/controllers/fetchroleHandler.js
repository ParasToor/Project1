const { raw } = require("mysql2");
const pool = require("../database/database");
const Role = require("../models/RoleModel");

exports.fetchroleHandler = async (req, res) => {
  try {
    //  console.log('fetching command trigger');
    // const data = await pool.query("select * from roles ");
    // console.log("data while fetching backend",data);

    // console.log("data - ", data);

    const data = await Role.findAll({ raw: true });

    // console.log("result - ", result);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in fetch Role Handler",
      error: err.message,
    });
  }
};
