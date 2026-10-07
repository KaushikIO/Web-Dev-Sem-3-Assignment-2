import express from "express";
import students from "../data/students.js";

const router = express.Router();

// GET all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET student by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
});

// POST - create student
router.post("/", (req, res) => {
  const { name, course, age, email } = req.body;

  if (!name || !course || !age || !email) {
    return res.status(400).json({
      message: "Name, course, age and email are required",
    });
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map((s) => s.id)) + 1
      : 1,
    name,
    course,
    age: Number(age),
    email,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PUT - update student
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const { name, course, age, email } = req.body;

  if (!name || !course || !age || !email) {
    return res.status(400).json({
      message: "Name, course, age and email are required",
    });
  }

  students[index] = {
    id,
    name,
    course,
    age: Number(age),
    email,
  };

  res.status(200).json(students[index]);
});

// DELETE - delete student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent,
  });
});

export default router;