const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    await Course.create(req.body);
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
    const course = await Course.findOne({ slug: slug });
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
