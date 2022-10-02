const User = require('../models/User');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/');
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
    const categories = await Category.find();
    const courses = await Course.find({user: req.session.userID});
    res.status(200).render('dasboard', {
      status: 'success',
      pageName: 'dasboard',
      user,
      categories,
      courses
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
