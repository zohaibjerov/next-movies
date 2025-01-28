import Movie from "../models/movie.model.js";
import multer from "multer";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all movies for a user
export const getMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const movies = await Movie.find({ user: userId });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user.id; // Assumes user ID is attached to req.user via middleware
    const movie = await Movie.findOne({ _id: id, user: userId });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new movie
export const createMovie = async (req, res) => {
  try {
    const { title, year, imageUrl, poster } = req.body;

    const userId = req.user.id;
    const newMovie = new Movie({
      title,
      year,
      image: imageUrl,
      user: userId,
      poster,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation error", error });
    } else {
      res.status(500).json({ message: "Server error", error });
      console.log(error);
    }
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, year, image, poster } = req.body;
  console.log(req.body, "DDD");

  try {
    const userId = req.user.id;
    const movie = await Movie.findOneAndUpdate(
      { _id: id, user: userId },
      { title, year, image: poster, poster },
      { new: true }
    );
    console.log(movie, "MMM....s....");

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update the movie
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id, user: userId },
      { title, year, image: poster, poster },
      { new: true }
    );

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  console.log("YES");
  const { id } = req.params;

  try {
    const userId = req.user.id; // Assumes user ID is attached to req.user via middleware
    const movie = await Movie.findOneAndDelete({ _id: id, user: userId });
    console.log(movie, "movie");
    console.log(userId, "userId");

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    // Delete the previous image if a new poster is being uploaded

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
