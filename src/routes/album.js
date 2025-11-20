import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getAlbums, getAlbumById, createAlbum } from "../controllers/albumController.js";

const router = express.Router();

// públicas
router.get("/", getAlbums);
router.get("/:id", getAlbumById);

// protegida (admin opcional de momento)
router.post("/", authenticateToken, createAlbum);

export default router;
