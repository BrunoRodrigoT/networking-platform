const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const authController = require("./controllers/authController");
const companyController = require("./controllers/companyController");
const courseController = require("./controllers/courseController");
const publicationController = require("./controllers/publicationController");
const favoriteController = require("./controllers/favoriteController");
const userController = require("./controllers/userController");

const dataBaseConnection = require("./database/database.config");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authController);
app.use("/api/company", companyController);
app.use("/api/course", courseController);
app.use("/api/publication", publicationController);
app.use("/api/favorite", favoriteController);
app.use("/api/user", userController);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

try {
  dataBaseConnection.sync(models);
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
