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
// const { verifyMiddleware } = require("../middlewares/verifyMiddleware");

//----------------------------Aman--------------------
// const { fetchroleHandler }  = require("../controllers/fetchroleHandler");
// const {createuserHandler} =require('../controllers/createuser');
// const {viewUserHandler}=require('../controllers/viewUserHandler');
// const { updateuser } = require("../controllers/updateUserHandler");
// const { deleteuser } = require("../controllers/deleteUserHandler");
const { fetchroleHandler } = require("../controllers/fetchroleHandler");
const { createuserHandler } = require("../controllers/createuser");
const { viewUserHandler } = require("../controllers/viewUserHandler");
const { updateuser } = require("../controllers/updateUserHandler");
const { deleteuser } = require("../controllers/deleteUserHandler");
const { deleteConfigHandler } = require("../controllers/deleteConfig");
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");

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

router.get("/configs", verifyMiddleware("Config Read"), viewHandler);
router.get("/roles", verifyMiddleware("Roles Read"), viewRoleHandler);
router.get("/users", verifyMiddleware("Account Read"), viewUserHandler);

router.post("/configs", verifyMiddleware("Config Write"), createHandler);
router.post("/roles", verifyMiddleware("Roles Write"), createRoleHandler);
router.post("/users", verifyMiddleware("Account Write"), createuserHandler);

router.patch("/configs", verifyMiddleware("Config Update"), updateHandler);
router.patch("/roles", verifyMiddleware("Roles Update"), updateRoleHandler);
router.patch("/users", verifyMiddleware("Account Update"), updateuser);

router.delete("/configs", verifyMiddleware("Config Delete"), deleteConfigHandler);
router.delete("/roles", verifyMiddleware("Roles Delete"), deleteRoleHandler);
router.delete("/users", verifyMiddleware("Account Delete"), deleteuser);

router.get("/fetchrole", fetchroleHandler);
router.post("/verify", verifyHandler);
router.post("/permis", getPermiHandler);

module.exports = router;
