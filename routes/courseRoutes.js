const express = require('express');
const courseController = require('../controlles/courseControllers');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').get(courseController.getAllCourses);
router
  .route('/')
  .post(roleMiddleware(['admin', 'teacher']), courseController.createCourse);
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
module.exports = router;
