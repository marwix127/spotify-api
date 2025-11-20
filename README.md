# Spotify API - Node.js + Prisma + PostgreSQL + Docker

API RESTful estilo Spotify desarrollada con **Node.js**, **Express**, **Prisma**, **PostgreSQL** y **Docker**.  
Permite manejar **usuarios, artistas, álbumes, canciones y playlists**.

---

## 🚀 Características

- Autenticación con JWT
- Gestión de usuarios y roles
- CRUD de artistas, álbumes y canciones
- Playlists con canciones asociadas (M:N)
- Seed para datos de prueba
- Base de datos persistente con Docker
- Endpoints protegidos por middleware de autenticación
- Estructura modular y escalable

---

## 🛠 Tecnologías

- Node.js 20
- Express
- Prisma ORM
- PostgreSQL 16
- Docker / Docker Compose
- bcrypt (hash de contraseñas)
- JSON Web Tokens (JWT)

---

## 📂 Estructura del proyecto

```
spotify-api/
│
├─ src/
│  ├─ controllers/
│  ├─ routes/
│  ├─ prismaClient.js
│  └─ server.js
│
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.js
│
├─ package.json
├─ Dockerfile
└─ docker-compose.yml
```

---

## ⚡ Instalación (Desarrollo Local)

### 1. Clonar el repositorio:

```bash
git clone <repo-url>
cd spotify-api
```

### 2. Instalar dependencias:

```bash
npm install
```

### 3. Crear `.env`:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/spotify
PORT=3000
JWT_SECRET=supersecret
```

### 4. Generar cliente de Prisma:

```bash
npx prisma generate
```

### 5. Ejecutar migraciones y seed:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 6. Levantar servidor:

```bash
npm run dev
```

---

## 🐳 Uso con Docker

### Construir y levantar contenedores:

```bash
docker-compose up --build -d
```

### Ejecutar seed dentro del contenedor (si es necesario):

```bash
docker exec -it spotify-api sh
npx prisma db seed
```

### Detener contenedores:

```bash
docker-compose down
```

---

## 📝 Endpoints principales

### Auth / Users

- `POST /auth/register` → Registro
- `POST /auth/login` → Login
- `GET /users/me` → Datos del usuario actual

### Artists

- `GET /artists` → Listar todos
- `GET /artists/:id` → Ver artista

### Albums

- `GET /albums` → Listar todos
- `GET /albums/:id` → Ver álbum

### Songs

- `GET /songs` → Listar canciones
- `POST /songs` → Crear canción (requiere title, artistId, audioUrl)

### Playlists

- `GET /playlists` → Playlists del usuario
- `POST /playlists` → Crear playlist
- `POST /playlists/:id/songs` → Añadir canción
- `DELETE /playlists/:id/songs/:songId` → Quitar canción

---

## 🔑 Usuario de prueba (Seed)

- **Email:** `marcel@example.com`
- **Password:** `123456`

---

## 📌 Notas

- Base de datos persistente con Docker volumen `db_data`
- Cambios en `prisma/schema.prisma` requieren:
  ```bash
  npx prisma migrate dev --name <nombre>
  npx prisma generate
  ```
- Endpoints protegidos necesitan token JWT (`Authorization: Bearer <token>`)

---

## 📚 Referencias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
