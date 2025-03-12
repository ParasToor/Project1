const pool = require("../database/database");
const bcrypt = require("bcrypt");

exports.updateuser = async (req, res) => {
  try {
    console.log("reqbodydat", req.body.data, req.body.id);
    const u_email = req.body.data.email;
    const u_password = req.body.data.newPassword;
    const u_role = Number(req.body.data.role);
    const u_id = Number(req.body.id);

    const dupliemail = await pool.query(
      "SELECT * FROM users_data WHERE email = ?",
      [u_email]
    );
    console.log("dupliemail", dupliemail);
    if (dupliemail[0].length > 0 && dupliemail[0].id !== u_id) {
      return res
        .status(400)
        .json({ message: `User with username ${u_email}  Already Exists` });
    }

    // Check if all required fields are provided
    if (!u_id || !u_email || !u_role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let query = "UPDATE users_data SET email = ?, role_id = ? WHERE id = ?";
    let values = [u_email, u_role, u_id];

    console.log("Password here - ", u_password);

    if (u_password) {
      const hashedPassword = await bcrypt.hash(u_password, 10);
      query =
        "UPDATE users_data SET email = ?, password = ?, role_id = ? WHERE id = ?";
      values = [u_email, hashedPassword, u_role, u_id];
    }

    const result = await pool.query(query, values);

    console.log('result', result, 'with query', query, values);
    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
