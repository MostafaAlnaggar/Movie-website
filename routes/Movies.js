const express = require("express");
const Movie = require("../schemas/movies.js");
const mongoose = require("mongoose");

const Router = express.Router();

Router.get("/", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

Router.post("/", (req, res) => {
  const body = req.body;
  if (body.name && body.rate) {
    const newMovie = new Movie({
      name: body.name,
      rate: body.rate,
    });
    newMovie.save();
    res.send(body);
  } else {
    res.status(400).send("You Must Enter name and rate!");
  }
});

Router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!id) {
    res.status(400).send("You Must Enter ID!");
    return;
  }

  const result = await Movie.findByIdAndDelete(id);

  res.send(result);
});

Router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send("Invalid ID format!");
      return;
    }

    if (!id) {
      res.status(400).send("You Must Enter ID!");
      return;
    }

    if (body.name || body.rate) {
      const updatedMovie = await Movie.findOneAndUpdate(
        { _id: id },
        { ...body },
        { new: true }
      );

      if (!updatedMovie) {
        res.status(404).send("Movie not found");
        return;
      }

      res.send(updatedMovie);
    } else {
      res.status(400).send("You Must Enter name and rate!");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = Router;
