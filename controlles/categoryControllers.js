const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    req.flash(
      'success',
      `The category was created successfully`
    );
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({
      status: 'success',
      categories,
    });
  } catch (error) {
    res.json({
      status: 'faile',
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const course = await Category.findByIdAndRemove(req.params.id);
    req.flash('success', `The ${course.name} category removed successfully`);
    res.redirect('/users/dashboard');
  } catch (error) {
    res.json({
      status: 'fail',
      error,
    });
  }
};