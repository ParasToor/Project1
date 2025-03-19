const User = require("../models/UserModel");

exports.dbTokenVerification = (email, token) => {
  return (req, res) => {
    try {

        console.log("work in dbTokenVerification");

      const result = User.findOne({
        where: { email: email },
      });

      if (!result) {
        return res.staus(404).json({
          success: false,
          message: "user not found in dbTokenVerification",
        });
      }

      console.lof("result - ", result);

    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error in dbTokenVerification",
        error: err.message,
      });
    }
  };
};
