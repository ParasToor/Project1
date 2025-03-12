const express = require("express");
const router = express.Router();
const { loginHandler } = require("../controllers/user");
const { check, validationResult, body } = require("express-validator");
const { createHandler } = require("../controllers/create");
const { viewHandler } = require("../controllers/view");
const { updateHandler } = require("../controllers/update");
const { verifyHandler } = require("../controllers/verify");
const { createRoleHandler } = require("../controllers/createRole");
const { viewRoleHandler } = require("../controllers/viewRole");
const { updateRoleHandler } = require("../controllers/updateRole");
const { deleteRoleHandler } = require("../controllers/deleteRole");
const { getPermiHandler } = require("../controllers/getPermi");
const { verifyMiddleware } = require("../controllers/verifyMiddleware");

var loginValidate = [
  check("email").notEmpty().withMessage("Email is required"),
  // .isLength({ min: 3, max: 15 })
  // .withMessage("User name Must Be between 3-15 Characters")
  // .bail()
  // .matches(/^[a-zA-Z0-9_]{3,15}$/)
  // .withMessage("Username must contain only letters, numbers, or underscores")
  check("password").notEmpty().withMessage("Password is required"),
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
router.post("/create",verifyMiddleware, createHandler);
router.post("/createRole", createRoleHandler);
router.post("/verify", verifyHandler);
router.post("/getPermi", getPermiHandler);
router.post("/view",verifyMiddleware ,viewHandler);
router.post("/viewRoles", viewRoleHandler);
router.patch("/update",verifyMiddleware ,updateHandler);
router.patch("/updateRoles", updateRoleHandler);
router.delete("/deleteRoles", deleteRoleHandler);

module.exports = router;
