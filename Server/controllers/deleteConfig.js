const pool = require("../database/database");

exports.deleteConfigHandler = async (req, res) => {
  try {

    const id = req.body.id;

    const query = await pool.query("DELETE FROM config WHERE id = ?",[id]);

    // console.log("Id - ", id);

    return res.status(200).json({
      success: true,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in deleteConfigHandler",
      error: err.message,
    });
  }
};
