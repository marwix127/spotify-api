import prisma from "../prisma.js";

// Listar todos los artistas
export const getArtists = async (req, res) => {
  try {
    const artists = await prisma.artist.findMany();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ver un artista por ID
export const getArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: parseInt(id) },
    });

    if (!artist) return res.status(404).json({ message: "Artist not found" });

    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un artista (solo admin)
export const createArtist = async (req, res) => {
  const { name, bio, image, country } = req.body;

  try {
    const artist = await prisma.artist.create({
      data: { name, bio, image, country },
    });
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
