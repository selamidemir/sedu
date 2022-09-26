const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;
const CourseSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;