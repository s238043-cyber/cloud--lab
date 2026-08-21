const mongoose = require('mongoose');

// Dinh nghia Mongoose Schema cho Student
const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);