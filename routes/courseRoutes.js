const express = require('express');
const courseController = require('../controlles/courseControllers');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').get(courseController.getAllCourses);
router
  .route('/')
  .post(roleMiddleware(['admin', 'teacher']), courseController.createCourse);
router.route('/:slug').get(courseController.getCourse);

module.exports = router;
