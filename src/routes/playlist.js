import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";

import {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist
} from "../controllers/playlistController.js";

const router = Router();

router.post("/", authenticateToken, createPlaylist);
router.get("/", authenticateToken, getMyPlaylists);
router.get("/:id", authenticateToken, getPlaylistById);

router.post("/:id/songs", authenticateToken, addSongToPlaylist);
router.delete("/:id/songs/:songId", authenticateToken, removeSongFromPlaylist);

router.delete("/:id", authenticateToken, deletePlaylist);

export default router;
