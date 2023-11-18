const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const authController = require("./controllers/authController");
const companyController = require("./controllers/companyController");
const courseController = require("./controllers/courseController");

const dataBaseConnection = require("./database/database.config");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authController);
app.use("/company", companyController);
app.use("/course", courseController);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

try {
  dataBaseConnection.sync(models);
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
