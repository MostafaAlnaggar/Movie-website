require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/Movies.js");
const logger = require("./middleware/logger.js");

const PORT = process.env.PORT || 3001;
const con = process.env.CONNECTION_STRING;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(Router);

mongoose
  .connect(con, {})
  .then(() => {
    console.log("Connected to db");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "localhost", () => {
  console.log("Server is running");
});
