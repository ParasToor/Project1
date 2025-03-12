const pool = require("../database/database");

exports.updateHandler = async (req, res) => {
  try {
    const data = req.body.data;
    const id = req.body.id.id;

    const keysArray = Object.keys(data);
    if (keysArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: "You have not passed anything to update",
      });
    }

    let queryString = "";

    keysArray.map((key) => {
      if(key === 'active'){
        console.log("This is key - ",key,"  This is value - ",data[key]);
      }
      else{
        queryString = queryString.concat(key, "='", data[key], "' , ");
      }
    });
    queryString = queryString.substring(0, queryString.length - 2);
    // console.log("Final query String - ", queryString);
    // console.log(
    //   "query - ",
    //   `UPDATE config SET ${queryString}  WHERE id = '${id}';`
    // );

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
