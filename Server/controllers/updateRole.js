const pool = require("../database/database");

exports.updateRoleHandler = async (req, res) => {
  try {
    const data = req.body;
    
    const arrPermi = data.newData.permissions;
    
    const newData = data.newData;

    const id = data.id;

    let queryString = "";
    arrPermi.map((one) => {
      queryString = queryString.concat('"', one.value, '",');
    });
    queryString = queryString.substring(0, queryString.length - 1);

    // console.log("query string - ", queryString);
    // console.log("id - ",newData.id);
    const result = await pool.query(`UPDATE roles SET name = '${newData.name}', permissions = '[${queryString}]' WHERE id = ${id};`);
    // console.log("result - " , result)
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inside update ROle Handler",
      error: err.message,
    });
  }
};
