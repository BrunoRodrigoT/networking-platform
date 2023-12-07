const express = require("express");
const Publication = require("../models/publication");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Company = require("../models/company");
const Course = require("../models/course");
const Messages = require("../utils/messages");

const router = express.Router();

//create new post
router.post("/", async (req, res) => {
  console.log(req);
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }

      const titleExists = req.body.title;

      if (!titleExists) {
        return res
          .status(400)
          .json({ message: "Titulo obrigatório", status: 400 });
      }

      const publication = await Publication.create(req.body);

      res.status(201).json(publication);
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

//get all posts
router.get("/", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err) => {
    try {
      const publications = await Publication.findAll();

      const response = await Promise.all(
        publications.map(async (e) => {
          const user = await User.findOne({
            where: { id: e.dataValues.user_id },
          });
          const company = await Company.findOne({
            where: { id: e.dataValues.company_id },
          });
          const course = await Course.findOne({
            where: { id: e.dataValues.course_id },
          });

          return { ...e.dataValues, user, company, course };
        })
      );

      res.status(200).json(response.reverse());
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

//get post by user_id
router.get("/:user_id", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }

      const userAlreadyExists = await User.findOne({
        where: { id: req.params.user_id },
      });

      if (!userAlreadyExists) {
        return res.status(400).json(Messages.userNotFound);
      }

      const publication = await Publication.findAll({
        where: { user_id: req.params.user_id },
      });
      res.status(201).json(publication);
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

module.exports = router;
