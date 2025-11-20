import prisma from "../prisma.js";

// GET /songs
export const getSongs = async (req, res) => {
  try {
    const songs = await prisma.song.findMany({
      include: { artist: true, album: true }
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /songs/:id
export const getSongById = async (req, res) => {
  try {
    const song = await prisma.song.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { artist: true, album: true }
    });

    if (!song) return res.status(404).json({ message: "Song not found" });
    
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /songs
export const createSong = async (req, res) => {
  const { title, duration, albumId, artistId,audioUrl } = req.body;

  try {
    const song = await prisma.song.create({
      data: { title, duration, albumId, artistId, audioUrl }
    });

    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
