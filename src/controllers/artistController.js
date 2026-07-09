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

// Actualizar un artista (solo admin)
export const updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, bio, image, country } = req.body;

  // Construir objeto de actualización solo con campos proporcionados
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (bio !== undefined) updateData.bio = bio;
  if (image !== undefined) updateData.image = image;
  if (country !== undefined) updateData.country = country;

  // Verificar que al menos un campo se proporcione
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "At least one field must be provided" });
  }

  try {
    const artist = await prisma.artist.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json(artist);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un artista (solo admin)
export const deleteArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await prisma.artist.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Artist deleted", artist });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(500).json({ message: error.message });
  }
};
