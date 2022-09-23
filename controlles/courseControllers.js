const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const course = await new Course(req.body);

  try {
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: 'bad request',
      err,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    status: 'success',
    title: 'All Courses',
    courses,
  });
};
