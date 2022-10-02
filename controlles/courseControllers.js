const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    console.log(user);
    await Course.create({
      ...req.body,
      user,
    });
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'bad request',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const filter = {};
    const categorySlug = req.query.category;

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      filter.category = category._id;
    }

    const courses = await Course.find(filter);
    res.status(200).render('courses', {
      courses,
      pageName: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const slug = req.params.slug;
    const course = await Course.findOne({ slug: slug }).populate('user');
    const categories = await Category.find();

    res.render('course', {
      course,
      categories,
      pageName: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findById(req.body.course_id);
    const categories = await Category.find();
    await user.courses.push({ _id: req.body.course_id });
    user.save();
    
    res.render('course', {
      course,
      categories,
      pageName: 'course',
    });
  } catch (error) {
    res.json({
      status: 'fail',
      error,
    });
  }
};
