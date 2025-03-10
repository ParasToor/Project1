const pool = require("../database/database");

exports.updateHandler = async (req, res) => {
  try {
    const data = req.body.data;
    const id = req.body.id.id;
    console.log("Data from front end on update request - ", data);
    console.log("Id from front end on update request - ", id);

    const keysArray = Object.keys(data);
    if (keysArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: "You have not passed anything to update",
      });
    }

    console.log("Keys from front end on update request - ", keysArray);

    // const udatedResponse = await pool.query(``);
    // try {

    let queryString = "";

    keysArray.map((key) => {
      // console.log("key - ",key);
      // console.log("data of key - ",data[key]);
      // const keyValue = data[key];
      // console.log("id - ",id);

      queryString = queryString.concat(key, "='", data[key], "' , ");
      // console.log(queryString);
      // queryString = queryString.concat(key,"=")
    });
    queryString = queryString.substring(0, queryString.length - 2);
    console.log("Final query String - ", queryString);
    console.log(
      "query - ",
      `UPDATE config SET ${queryString}  WHERE id = '${id}';`
    );
    const queryResult = await pool.query(
      `UPDATE config SET ${queryString}  WHERE id = '${id}';`
    );

    console.log("updated data - ", queryResult);

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
