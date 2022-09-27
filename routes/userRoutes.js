const express = require('express');
const authController = require('../controlles/authController');
const router = express.Router();

router.route('/').post(authController.createUser);
router.route('/login').post(authController.loginUser);

module.exports = router;
