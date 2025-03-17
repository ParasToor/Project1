const pool = require("../database/database");
const Config = require("../models/ConfigModel");

exports.viewHandler = async (req, res) => {
  try {
    // const data = await pool.query("SELECT * FROM config");

    const data = await Config.findAll({
      raw: true,
    });


    const sqlData = data;

    res.status(200).json({
      success: true,
      sqlData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in view Handler",
      error: err.message,
    });
  }
};
