const pool = require("../database/database");
const Config = require("../models/ConfigModel");

exports.updateHandler = async (req, res) => {
  try {
    const data = req.body.data;
    const id = req.body.id;

    console.log("update data - ", data);
    console.log("update data id - ", id);

    const [updatedRows] = await Config.update(data, {
      where: { id: id },
    });

    // const keysArray = Object.keys(data);

    // if (keysArray.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You have not passed anything to update",
    //   });
    // }

    // let queryString = "";

    // keysArray.map((key) => {

    //     queryString = queryString.concat(key, "='", data[key], "' , ");
    // });

    // queryString = queryString.substring(0, queryString.length - 2);

    // const queryResult = await pool.query(
    //   `UPDATE config SET ${queryString}  WHERE id = '${id}';`
    // );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messagge: "Error in update Handler",
      error: err.message,
    });
  }
};
