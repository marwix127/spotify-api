import express from "express";
import { getArtists, getArtistById, createArtist, updateArtist, deleteArtist } from "../controllers/artistController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Rutas públicas
router.get("/", getArtists);
router.get("/:id", getArtistById);

// Rutas protegidas (solo admin)
router.post("/", authenticateToken, createArtist);
router.put("/:id", authenticateToken, updateArtist);
router.delete("/:id", authenticateToken, deleteArtist);

export default router;
