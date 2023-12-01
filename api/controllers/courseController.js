const express = require("express");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");
const Messages = require("../utils/messages");

const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }

      const nameAlreadyExists = await Course.findOne({
        where: { name: req.body.name },
      });

      if (nameAlreadyExists) {
        return res.status(400).json({ error: "Nome já cadastrado" });
      }

      const course = await Course.create(req.body);

      res.status(201).json(course);
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(201).json(courses);
  } catch (error) {
    res.status(500).json(Messages.internalServerError);
  }
});

module.exports = router;
