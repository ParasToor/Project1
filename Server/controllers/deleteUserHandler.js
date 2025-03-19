const pool = require("../database/database");
const User = require("../models/UserModel");

exports.deleteuser = async (req, res) => {
  try {
    const userId = req.query.id;

    // Check if user ID is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // const query = 'DELETE FROM users_data WHERE id = ?';
    // const values = [userId];

    // const result = await pool.query(query, values);

    const result = await User.destroy({
      where: { id: userId },
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
