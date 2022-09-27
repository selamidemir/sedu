const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION STARTS
          res.status(200).json({
            status: 'success',
            user: {
              name: user.name,
              email: user.email,
            },
          });
        } else {
          res.status(400).json({
            status: 'fail',
            message: "You can't login.",
          });
        }
      });
    }
  });
};
