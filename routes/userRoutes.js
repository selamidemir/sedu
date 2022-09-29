const express = require('express');
const authController = require('../controlles/authController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

router.route('/').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logOutUser);
router.route('/dashboard').get(authMiddleware, authController.userDashboardPage);

module.exports = router;
