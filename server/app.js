import express from "express";
import path from "path";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import uploadRoutes from "./routes/uploads.routes.js";
dotenv.config();
const app = express();

app.use(express.json());


app.use(cors());
app.use(helmet());
app.use("/uploads", express.static(path.join("uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/uploads", uploadRoutes);


export default app;
