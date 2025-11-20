import prisma from "../prisma.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        image,
        userId,
      },
    });

    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error creating playlist" });
  }
};

export const getMyPlaylists = async (req, res) => {
  try {
    const userId = req.user.id;

    const playlists = await prisma.playlist.findMany({
      where: { userId },
      include: {
        songs: {
          include: { song: true },
        },
      },
    });

    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlists" });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const playlist = await prisma.playlist.findUnique({
      where: { id },
      include: {
        songs: {
          include: { song: true },
        },
      },
    });

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlist" });
  }
};

export const addSongToPlaylist = async (req, res) => {
  try {
    const playlistId = Number(req.params.id);
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ message: "songId es obligatorio" });
    }

    await prisma.playlistSong.create({
      data: {
        playlistId,
        songId: Number(songId),
      },
    });

    res.json({ message: "Canción añadida correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error adding song to playlist" });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlistId = Number(req.params.id);
    const songId = Number(req.params.songId);

    await prisma.playlistSong.delete({
      where: {
        playlistId_songId: {
          playlistId,
          songId,
        },
      },
    });

    res.json({ message: "Canción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error removing song from playlist" });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const playlistId = Number(req.params.id);

    await prisma.playlist.delete({
      where: { id: playlistId },
    });

    res.json({ message: "Playlist eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting playlist" });
  }
};
