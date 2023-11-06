const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./models");
const authController = require("./controllers/authController");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authController);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
