const { where } = require("sequelize");
const pool = require("../database/database");
const Role = require("../models/RoleModel");
const User = require("../models/UserModel");

exports.updateRoleHandler = async (req, res) => {
  try {
    
    const data = req.body;

    console.log("req.body - " ,req.body);

    const arrPermi = data.permissions;

    // const newData = data.newData;

    const id = data.id;

    let queryString = "";
    arrPermi.map((one) => {
      queryString = queryString.concat('"', one.value, '",');
    });

    const newArray = arrPermi.map((one) => {
      return one.value;
    });

    queryString = queryString.substring(0, queryString.length - 1);

    const result = await Role.update(
      {
        name: data.name,
        permissions: newArray,
      },
      {
        where: { id: id },
      }
    );

    const users = await User.update(
      {
        token: null,
      },
      { where: { role_id: id } }
    );

    console.log("result - ", result);
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
