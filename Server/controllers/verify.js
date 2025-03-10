const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyHandler = async (req, res) => {
  try {
    const token = req.body.token;
    const result = jwt.verify(token, process.env.JWT_KEY);

    console.log("Result of verifying the token - ",result);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error inside verify handler",
      error: err.message,
    });
  }
};
