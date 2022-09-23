const mongoose = require('mongoose');

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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
