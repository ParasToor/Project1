const pool = require("../database/database");
const Role = require("../models/RoleModel");

exports.deleteRoleHandler = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("Data from front end - ", data);
    // console.log("id from front end - ", id);

    // const queryResult = await pool.query(`DELETE FROM roles WHERE id=${id}`);
    const queryResult = await Role.destroy({
      where: { id: id },
    });

    // console.log("Result of sql qury ", queryResult);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in delete Role Handler",
      error: err.message,
    });
  }
};
