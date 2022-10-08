const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    await Course.create({
      ...req.body,
      user,
    });

    req.flash(
      'success',
      `The ${req.body.name} course was created successfully`
    );

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
    const filter = {
      name: '',
      category: null,
    };
    const categorySlug = req.query.category;
    const query = req.query.search;

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });

      filter.category = category._id;
      console.log(filter);
    }

    if (query) filter.name = query;

    const courses = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    });

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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: slug }).populate('user');
    const categories = await Category.find();

    res.render('course', {
      user,
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
    const user = await User.findOne({ _id: req.session.userID });
    const course = await Course.findById(req.body.course_id);
    const categories = await Category.find();
    await user.courses.push(course);
    user.save();

    res.render('course', {
      user,
      course,
      categories,
      pageName: 'courses',
    });
  } catch (error) {
    res.json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findById(req.body.course_id);
    const categories = await Category.find();
    await user.courses.pull({ _id: req.body.course_id });
    user.save();

    res.render('course', {
      user,
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

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug });
    req.flash('success', `The ${course.name} course removed successfully`);
    res.redirect('/users/dashboard');
  } catch (error) {
    res.json({
      status: 'fail',
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    console.log(course.name)
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();

    req.flash('success', `The ${course.name} course was updated successfully`);

    res.redirect('/users/dashboard');
  } catch (error) {
    res.json({
      status: 'fail',
      error,
    });
  }
};
