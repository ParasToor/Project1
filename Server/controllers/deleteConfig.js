const pool = require("../database/database");
const Config = require("../models/ConfigModel");

exports.deleteConfigHandler = async (req, res) => {
  try {
    // console.log("req.body - ", req.body);

    const id = req.params.id;

    // const query = await pool.query("DELETE FROM config WHERE id = ?",[id]);

    const deleteResult = await Config.destroy({
      where: { id: id },
    });
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
