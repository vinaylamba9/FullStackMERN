const express = require("express");
const router = express.Router();
const { signup, signout, signin } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name", "name should be of at least 3 characters").isLength({
      min: 3,
    }),
    check("lastname", "name should be of at least 1 character").isLength({
      min: 1,
    }),
    check("email", "Email is required").isEmail(),
    check("password", "password should of at least 6 char").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "password should of at least 6 char").isLength({
      min: 6,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
