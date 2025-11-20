import express from "express";
import { getArtists, getArtistById, createArtist } from "../controllers/artistController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Rutas públicas
router.get("/", getArtists);
router.get("/:id", getArtistById);

// Ruta protegida (solo admin)
router.post("/", authenticateToken, createArtist);

export default router;
