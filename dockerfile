# 1. Imagen base
FROM node:20-alpine

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar package
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar código fuente
COPY . .

# 6. Generar Prisma Client
RUN npx prisma generate

# 7. Exponer puerto
EXPOSE 3000

# 8. Comando por defecto
CMD ["npm", "run", "dev"]
