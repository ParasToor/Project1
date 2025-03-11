const pool = require("../database/database");

exports.createRoleHandler = async (req, res) => {
  try {
    const data = req.body.data;

    console.log("Error from backend - ", data);
    
    if (!data.name) {
      return res.status(401).json({
        success: "false",
        message: "Name is missing",
        errors: [
          {
            type: "field",
            value: "",
            msg: "Name of the role is required",
            path: "name",
            location: "query",
          },
        ],
      });
    }

    if (!data.permissions) {
      return res.status(401).json({
        success: "false",
        message: "Permissions is missing",
        errors: [
          {
            type: "field",
            value: "",
            msg: "Permissions to assign are required",
            path: "permissions",
            location: "query",
          },
        ],
      });
    }

    const arrayOfPerm = data.permissions;

    const findRole = await pool.query(
      `SELECT * FROM roles WHERE name = '${data.name}';`
    );

    console.log("Role FINDING - ", findRole[0].length);

    if (findRole[0].length !== 0) {
      return res.status(401).json({
        success: "false",
        message: "This Role already exists",
        errors: [
          {
            type: "field",
            value: "",
            msg: "Role name already exists.",
            path: "name",
            location: "query",
          },
        ],
      });
    }

    let queryString = "";

    arrayOfPerm.map((one) => {
      queryString = queryString.concat('"', one.value, '",');
    });
    queryString = queryString.substring(0, queryString.length - 1);

    const dataBaseResult =
      await pool.query(`INSERT INTO roles (name, permissions)
    VALUES ('${data.name}', '[${queryString}]');`);

    console.log("Result from backend data entry creation - ", dataBaseResult);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inside create Role Handler",
      error: err.message,
    });
  }
};
