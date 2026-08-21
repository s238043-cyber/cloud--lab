const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Model Student vua tao
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ket noi MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(">>> Da ket noi MongoDB Atlas thanh cong!"))
  .catch((err) => console.error(">>> Loi ket noi MongoDB Atlas:", err));

// ================= REST API =================

// Câu 36: API GET /api/students để lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Câu 37: API POST /api/students để thêm sinh viên
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Câu 38: API PUT /api/students/:id để cập nhật sinh viên
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Câu 39: API DELETE /api/students/:id để xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Da xoa sinh vien thanh cong" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});