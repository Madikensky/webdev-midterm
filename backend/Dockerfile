# 1. Base image
FROM node:20-alpine

# 2. Folder inside the image where the app lives
WORKDIR /app

# 3. Dependency files first (for layer caching)
COPY package*.json ./

# 4. Install production dependencies from the lock file
RUN npm ci --omit=dev

# 5. Now the source code
COPY . .

# 6. Document the port
EXPOSE 3000

# 7. Don't run as root
USER node

# 8. Start command (exec form, a JSON array)
CMD ["node", "src/index.js"]
