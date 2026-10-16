FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy application source
COPY . .

# Environment variables default
ENV PORT=3000
ENV NODE_ENV=production
ENV DATA_DIR=/app/data

# Dokploy persistent volume can be mounted at /app/data
VOLUME ["/app/data"]

EXPOSE 3000

CMD ["node", "server.js"]
