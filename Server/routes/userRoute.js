const express = require("express");
const router = express.Router();
const { loginHandler } = require("../controllers/user");
const { check, validationResult, body } = require("express-validator");
const { createHandler } = require("../controllers/create");
const { viewHandler } = require("../controllers/view");
const { updateHandler } = require("../controllers/update");
const { verifyHandler } = require("../controllers/verify");

var loginValidate = [
  check("userName").notEmpty().withMessage("Username is required"),
  // .isLength({ min: 3, max: 15 })
  // .withMessage("User name Must Be between 3-15 Characters")
  // .bail()
  // .matches(/^[a-zA-Z0-9_]{3,15}$/)
  // .withMessage("Username must contain only letters, numbers, or underscores")
  check("password").notEmpty().withMessage("Username is required"),
  // .isLength({ min: 8 })
  // .withMessage("Password Must Be at Least 8 Characters")
  // .bail()
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  // )
  // .withMessage(
  //   "Password must include uppercase, lowercase, number, and special character"
  // )
];

// post krna hai
router.get("/login", loginValidate, loginHandler);
router.post("/create", createHandler);
router.post("/verify", verifyHandler);
router.get("/view", viewHandler);
router.patch("/update", updateHandler);

module.exports = router;
