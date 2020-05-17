const User = require("../models/User");

exports.signup = (req, res) => {
  const user = new User(req.body);
  //great example of error first callback
  user.save((err, user) => {
    if (err)
      return res.json({
        err: "DB is not able to save User data.",
      });
    res.json({
      email: user.email,
      id: user._id,
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    msg: "Log out",
  });
};
