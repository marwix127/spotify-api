import prisma from "../src/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Iniciando seed completa...");

  // ---------- USERS ----------
  const users = [];
  const userData = [
    { name: "Marcel", email: "marcel@example.com" },
    { name: "Ana", email: "ana@example.com" },
    { name: "Carlos", email: "carlos@example.com" },
    { name: "Lucía", email: "lucia@example.com" },
    { name: "David", email: "david@example.com" },
  ];

  for (const u of userData) {
    const hashed = await bcrypt.hash("123456", 10);
    const user = await prisma.user.create({
      data: { ...u, password: hashed },
    });
    users.push(user);
  }

  console.log("👤 Usuarios creados:", users.length);

  // ---------- ARTISTS ----------
  const artistList = [
    "Daft Punk",
    "The Weeknd",
    "David Guetta",
    "Calvin Harris",
    "Arctic Monkeys",
    "Imagine Dragons",
    "Queen",
    "Eminem",
    "Drake",
    "Coldplay"
  ];

  const artists = [];

  for (const name of artistList) {
    const artist = await prisma.artist.create({
      data: {
        name,
        country: "Unknown",
        image: `https://picsum.photos/seed/${name.replace(" ", "")}/300`,
      },
    });
    artists.push(artist);
  }

  console.log("🎤 Artistas creados:", artists.length);

  // ---------- ALBUMS ----------
  const albums = [];

  for (const artist of artists) {
    const albumCount = Math.floor(Math.random() * 2) + 1; // 1-2 álbumes por artista

    for (let i = 0; i < albumCount; i++) {
      const album = await prisma.album.create({
        data: {
          title: `${artist.name} Album ${i + 1}`,
          year: 2010 + i,
          cover: `https://picsum.photos/seed/${artist.name}_album${i}/500`,
          artistId: artist.id,
        },
      });

      albums.push(album);
    }
  }

  console.log("💿 Álbumes creados:", albums.length);

  // ---------- SONGS ----------
  const songs = [];

  for (const album of albums) {
    const songCount = Math.floor(Math.random() * 4) + 3; // 3-6 canciones por álbum

    for (let i = 0; i < songCount; i++) {
      const song = await prisma.song.create({
        data: {
          title: `${album.title} - Track ${i + 1}`,
          duration: Math.floor(Math.random() * 240) + 120, // 2 a 6 minutos
          audioUrl: "https://example.com/audio.mp3",
          image: album.cover,
          artistId: album.artistId,
          albumId: album.id,
        },
      });

      songs.push(song);
    }
  }

  console.log("🎵 Canciones creadas:", songs.length);

  // ---------- PLAYLISTS ----------
  const playlists = [];

  for (const user of users) {
    const playlist = await prisma.playlist.create({
      data: {
        name: `${user.name}'s Playlist`,
        description: "Generated automatically",
        image: `https://picsum.photos/seed/${user.name}-playlist/400`,
        userId: user.id,
      },
    });

    playlists.push(playlist);

    // Añadir canciones aleatorias
    const randomSongs = songs.slice().sort(() => 0.5 - Math.random()).slice(0, 10);

    for (const song of randomSongs) {
      await prisma.playlistSong.create({
        data: {
          playlistId: playlist.id,
          songId: song.id,
        },
      });
    }
  }

  console.log("🎧 Playlists creadas:", playlists.length);
  console.log("📌 Canciones añadidas a playlist");

  console.log("🌱 Seed completada ✔");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
