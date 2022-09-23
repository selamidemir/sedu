const express = require('express');
const courseController = require('../controlles/courseControllers');

const router = express.Router();

router.route('/').get(courseController.getAllCourses);
router.route('/').post(courseController.createCourse);

module.exports = router;
