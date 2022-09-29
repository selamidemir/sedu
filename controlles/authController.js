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
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION STARTS
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
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

exports.logOutUser = (req, res) => {
  req.session.destroy(() => res.status(200).redirect('/'));
};

exports.userDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    res.status(200).render('dasboard', {
      status: 'success',
      pageName: 'dasboard',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
