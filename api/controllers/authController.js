const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { User, Company, Course } = require("../models");
const validator = require("validator");
const moment = require("moment");

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ message: "Email inválido", status: 400 });
    }

    const hashedPassword = await argon2.hash(req.body.password);

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Email já cadastrado", status: 400 });
    }

    const isValidDate = moment(
      req.body.birth_date,
      moment.ISO_8601,
      true
    ).isValid();
    if (!isValidDate) {
      return res
        .status(400)
        .json({ message: "Data de nascimento inválida", status: 400 });
    }

    const company = await Company.findByPk(req.body.company_id);

    if (!company) {
      return res
        .status(400)
        .json({ message: "Campus não encontrado", status: 400 });
    }

    const course = await Course.findByPk(req.body.course_id);

    if (!course) {
      return res
        .status(400)
        .json({ message: "Campus não encontrado", status: 400 });
    }

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const userWithCompany = {
      ...user.toJSON(),
      company: company.toJSON(),
      course: course.toJSON(),
    };

    res.status(201).json(userWithCompany);
  } catch (error) {
    console.error(error); // Log do erro para depuração
    res.status(500).json({ message: "Erro interno do servidor", status: 500 });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado", status: 404 });
  }

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "Email ou senha inválidos", status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, "your-secret-key", {
    expiresIn: "1h",
  });
  res.json({ user, token });
});

// Rota protegida
router.get("/protected", (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", status: 401 });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }
    res.json({ message: "Welcome to the protected route!", user: decoded });
  });
});

module.exports = router;
