const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  // means there is some error in errors Array
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  //great example of error first callback
  user.save((err, user) => {
    if (err)
      return res.json({
        err: "Something wrong in your req",
      });
    res.json({
      msg: "User is successfully signed up!",
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Email does not exist.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "User Email and Password does not match.",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 1000 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.json({
    msg: "Log out",
  });
};

// protected route
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET_KEY,
  userProperty: "auth",
});

// userProperty: 'auth' is set up at req like, it will put a property with name as "auth" and value as _id for that user
// Like auth: '45kljsafw4safa7sdafsaf7sadfasfa8f'

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    res.status(403).json({
      error: "Access Denied!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Sorry! You are not admin, Hence not authorized to access...",
    });
  }
  next();
};
