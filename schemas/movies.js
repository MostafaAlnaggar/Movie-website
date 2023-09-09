const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const movie = mongoose.model("movie", movieSchema);

module.exports = movie;
