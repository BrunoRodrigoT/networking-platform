const express = require("express");
const Company = require("../models/company");
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

      const nameAlreadyExists = await Company.findOne({
        where: { name: req.body.name },
      });

      if (nameAlreadyExists) {
        return res.status(400).json({ error: "Nome já cadastrado" });
      }

      const company = await Company.create(req.body);

      res.status(201).json(company);
    } catch (error) {
      res.status(500).json(Messages.internalServerError);
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(201).json(companies);
  } catch (error) {
    res.status(500).json(Messages.internalServerError);
  }
});

module.exports = router;
