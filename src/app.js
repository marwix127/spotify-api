import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import artistRoutes from './routes/artist.js';
import albumRoutes from './routes/album.js';
import songRoutes from './routes/songs.js';
import playlistRoutes from './routes/playlist.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Rutas
app.use("/auth", authRoutes);
app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);
app.use("/songs", songRoutes);
app.use("/playlists", playlistRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Spotify API running..." });
});

export default app;
