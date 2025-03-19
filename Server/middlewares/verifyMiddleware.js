const jwt = require("jsonwebtoken");
const dbTokenVerification = require("./dbVerifyToken");
const User = require("../models/UserModel");
require("dotenv").config();

exports.verifyMiddleware = (permissionName) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const result = jwt.verify(token, process.env.JWT_KEY);
      const permiArray = result.permissions;

      console.log("Authentication Done");

      // console.log("Result - ", result);

      //database authentication
      console.log("work in dbTokenVerification");

      const findUser = await User.findOne({
        where: { email: result.email },
        raw: true,
      });

      if (!findUser) {
        return res.staus(404).json({
          success: false,
          message: "user not found in dbTokenVerification",
        });
      }

      console.log("findUser - ", findUser);

      if (findUser.token === null) {
        return res.status(498).json({
          success: false,
          message: "The jwt token is invalide",
        });
      }

      if (!permiArray.includes(permissionName)) {
        return res.status(500).json({
          success: false,
          message: `You have no permission for this operation - ${permissionName}`,
        });
      }

      console.log("Authorization Done");

      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error inside verify middleware",
        error: err.message,
      });
    }
  };
};

// exports.verifyMiddleware = async (req, res, next) => {
//     try {
//       const token = req.headers.authorization;
//       const result = jwt.verify(token, process.env.JWT_KEY);
//       const permiArray = result.permissions;

//       console.log("Authentication Done");

//       next();
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Error inside verify middleware",
//         error: err.message,
//       });
//     }
//   };
