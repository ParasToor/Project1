const pool = require("../database/database");

exports.viewRoleHandler = async (req, res) => {
  try {
    const dataBaseResult = await pool.query("SELECT * FROM roles");

    const data = dataBaseResult[0];
    res.status(200).json({
      success: true,
      data: data,
      //   permissions:data.permissions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inside ciew Role Handler.",
      error: err.message,
    });
  }
};
