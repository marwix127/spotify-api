import prisma from "../prisma.js";

// GET /albums
export const getAlbums = async (req, res) => {
  try {
    const albums = await prisma.album.findMany({
      include: { artist: true }
    });
    res.json(albums);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET /albums/:id
export const getAlbumById = async (req, res) => {
  try {
    const album = await prisma.album.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { artist: true, songs: true }
    });
    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// POST /albums
export const createAlbum = async (req, res) => {
  const { title, cover, year, artistId } = req.body;

  try {
    const album = await prisma.album.create({
      data: { title, cover, year, artistId }
    });
    res.status(201).json(album);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
