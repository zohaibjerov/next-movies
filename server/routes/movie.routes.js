import express from "express";
import {
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie,
  getMovieById,
} from "../controllers/movie.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Routes
router.get("/", authMiddleware, getMovies);
router.get("/:id", authMiddleware, getMovieById);
router.post("/", authMiddleware, createMovie);
router.put("/:id", authMiddleware, updateMovie);
router.delete("/:id", authMiddleware, deleteMovie);

export default router;
