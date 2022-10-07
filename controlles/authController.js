const User = require('../models/User');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/');
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    req.flash('error', `${errors.array()[0].msg}`);
    res.redirect('/');
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // USER SESSION STARTS
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash('error', 'Wrong username or password');
          res.status(400).redirect('/');
        }
      });
    } else {
      req.flash('error', 'User is not exists');
      res.status(400).redirect('/');
    }
  });
};

exports.logOutUser = (req, res) => {
  req.session.destroy(() => res.status(200).redirect('/'));
};

exports.userDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID }).populate(
      'courses'
    );
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    res.status(200).render('dasboard', {
      user,
      categories,
      courses,
      pageName: 'dasboard',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
