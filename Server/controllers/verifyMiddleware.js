const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyMiddleware = async (req, res, next) => {
  try {

    const token = req.body.headers.Authorization;
    const result = jwt.verify(token, process.env.JWT_KEY);

    console.log("Verification Done");

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error inside verify handler",
      error: err.message,
    });
  }
};
