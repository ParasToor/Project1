const pool = require("../database/database");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

exports.updateuser = async (req, res) => {
  try {
    console.log("reqbodydat", req.body.data, req.body.id);

    const u_email = req.body.data.email;
    const u_password = req.body.data.newPassword;
    const u_role = Number(req.body.data.role);
    const u_id = Number(req.body.id);

    // const dupliemail = await pool.query(
    //   "SELECT * FROM users_data WHERE email = ?",
    //   [u_email]
    // );

    const dupliemail = await User.findOne({
      where: { email: u_email },
      raw: true,
    });

    // console.log("dupliemail", dupliemail);

    if (dupliemail && dupliemail.id !== u_id) {
      return res
        .status(400)
        .json({ message: `User with username ${u_email}  Already Exists` });
    }

    // Check if all required fields are provided
    if (!u_id || !u_email || !u_role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // let query = "UPDATE users_data SET email = ?, role_id = ? WHERE id = ?";

    // let values = [u_email, u_role, u_id];

    console.log("Password here - ", u_password);

    let result = null;

    if (u_password) {
      const hashedPassword = await bcrypt.hash(u_password, 10);
      result = await User.update(
        {
          email: u_email,
          role_id: u_role,
          password: hashedPassword,
        },
        {
          where: { id: u_id },
        }
      );
    } else {
      result = await User.update(
        {
          email: u_email,
          role_id: u_role,
        },
        {
          where: { id: u_id },
        }
      );
    }

    // const result = await pool.query(query, values);

    // console.log("result", result, "with query", query, values);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
