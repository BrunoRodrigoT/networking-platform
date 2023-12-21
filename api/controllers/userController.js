const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { User, Company, Course } = require("../models");
const validator = require("validator");
const moment = require("moment");
const Messages = require("../utils/messages");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }
  jwt.verify(token, "your-secret-key", async (err) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json(Messages.userNotFound);
      }

      const company = await Company.findByPk(user.company_id);
      const course = await Course.findByPk(user.course_id);

      if (!company || !course) {
        return res.status(404).json(Messages.badRequest);
      }

      res.status(201).json({
        ...user.dataValues,
        company: company,
        course: course,
      });
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

router.get("/", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }

      const { query } = req.query;

      if (!query) {
        return res.status(400).json(Messages.badRequest);
      }
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { username: { [Op.iLike]: `%${query}%` } },
            { email: { [Op.iLike]: `%${query}%` } },
            { specialties: { [Op.contains]: [query] } },
          ],
        },
        include: [Company, Course],
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

router.put("/:id", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }

      const userAlreadyExists = await User.findByPk(req.params.id);

      if (!userAlreadyExists) {
        return res.status(400).json(Messages.userNotFound);
      }

      const hashedPassword = await argon2.hash(req.body.password);

      if (hashedPassword != userAlreadyExists.password) {
        return res.status(400).json(Messages.invalidPassword);
      }

      const user = await User.update(req.body, {
        where: { id: req.params.id },
      });

      return res.json(user);
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

module.exports = router;
