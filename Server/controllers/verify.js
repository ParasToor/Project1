const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyHandler = async (req, res) => {
  try {
    
    const token = req.body.headers.Authorization;
    const result = jwt.verify(token, process.env.JWT_KEY);

    res.status(200).json({
      success: true,
    });

    // next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inside verify handler",
      error: err.message,
    });
  }
};
