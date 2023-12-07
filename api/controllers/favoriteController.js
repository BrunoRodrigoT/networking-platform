const express = require("express");
const Publication = require("../models/publication");
const User = require("../models/user");
const Favorite = require("../models/favorite");
const Company = require("../models/company");
const Course = require("../models/course");
const Messages = require("../utils/messages");
const jwt = require("jsonwebtoken");

const router = express.Router();

// create
router.post("/", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err, decoded) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }

      const favorite = await Favorite.create({
        ...req.body,
        user_id: decoded.userId,
      });

      res.status(201).json(favorite);
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err, decoded) => {
    try {
      if (err) {
        return res.status(401).json(Messages.unalthorized);
      }

      const favoriteAlreadyExists = await Favorite.findOne({
        where: { id: req.params.id },
      });

      if (!favoriteAlreadyExists) {
        return res.status(400).json(Messages.favoriteNotFound);
      }

      await Favorite.destroy({
        where: { id: req.params.id },
      });

      res
        .status(201)
        .json({ status: 201, message: "Publicação desfavoritada" });
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

// fav by user
router.get("/", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json(Messages.unalthorized);
  }

  jwt.verify(token, "your-secret-key", async (err, decoded) => {
    try {
      const favorites = await Favorite.findAll({
        where: { user_id: decoded.userId },
      });

      const response = await Promise.all(
        favorites.map(async (e) => {
          const user = await User.findOne({
            where: { id: e.dataValues.user_id },
          });

          const publication = await Publication.findOne({
            where: { id: e.dataValues.publication_id },
          });

          const company = await Company.findOne({
            where: { id: user.dataValues.company_id },
          });

          const course = await Course.findOne({
            where: { id: user.dataValues.course_id },
          });

          return { ...e.dataValues, user, publication, company, course };
        })
      );

      res.status(200).json(response.reverse());
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

module.exports = router;
