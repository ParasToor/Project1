const { raw } = require("mysql2");
const pool = require("../database/database");
const Role = require("../models/RoleModel");

const {Role} = require('../database/models')
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

    // console.log("data.permissions - ",data.permissions);

    const arrayOfPerm = data.permissions;

    const findRole = await Role.findOne({
      where: { name: data.name },
    });

    // const findRole = await pool.query(
    //   `SELECT * FROM roles WHERE name = '${data.name}';`
    // );

    // console.log("Role FINDING - ", findRole[0].length);

    if (findRole) {
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
      // queryString = queryString.concat('"', one.value, '",');
      queryString = queryString.concat(one.value, '",');
    });

    const newArray = arrayOfPerm.map((one) => {
      return one.value;
      // queryString = queryString.concat('"', one.value, '",');
      // queryString = queryString.concat( one.value, '",');
    });

    console.log("newArray - ", newArray);

    queryString = queryString.substring(0, queryString.length - 2);

    // const dataBaseResult =
    //   await pool.query(`INSERT INTO roles (name, permissions)
    // VALUES ('${data.name}', '[${queryString}]');`);

    const dataBaseResult = await Role.create({
      name: data.name,
      permissions: newArray,
    });

    // console.log("Result from backend data entry creation - ", dataBaseResult);
   console.log(queryString,"querrry ");

   

    // console.log("Result from backend data entry creation - ", newRole);


    res.status(200).json({
      success: true,
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(error => ({
        message: error.message,
        type: error.type,
        path: error.path,
        value: error.value,
      }));
      res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors,
      });
    } else {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error inside create Handler",
        error: err.message,
      });
    }
  }
};
