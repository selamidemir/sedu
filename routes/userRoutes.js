const express = require('express');
const authController = require('../controlles/authController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');

router.route('/').post(
  [
    body('name').not().isEmpty().withMessage('Please enter your name'),
    body('email')
      .isEmail()
      .withMessage('Please enter correct email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) return Promise.reject('Email is already exists.');
        });
      }),
    body('password').not().isEmpty().withMessage('Please enter a password'),
  ],
  authController.createUser
);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logOutUser);
router.route('/:id').delete(authController.deleteUser);
router
  .route('/dashboard')
  .get(authMiddleware, authController.userDashboardPage);

module.exports = router;
