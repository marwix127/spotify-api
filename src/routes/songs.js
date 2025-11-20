import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getSongs, getSongById, createSong } from "../controllers/songController.js";

const router = express.Router();

// públicas
router.get("/", getSongs);
router.get("/:id", getSongById);

// protegida (solo usuarios autenticados)
router.post("/", authenticateToken, createSong);

export default router;
