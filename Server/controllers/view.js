const pool = require("../database/database");

exports.viewHandler = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM config");
    const sqlData = data[0];

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
