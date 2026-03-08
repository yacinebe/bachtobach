FROM node:20-alpine

WORKDIR /app

# Copy workspace manifests first for better layer caching
COPY package.json package-lock.json ./
COPY packages/game-engine/package.json ./packages/game-engine/
COPY packages/types/package.json       ./packages/types/
COPY packages/api-client/package.json  ./packages/api-client/
COPY apps/api/package.json             ./apps/api/
COPY apps/web/package.json             ./apps/web/

# Install all workspace dependencies
RUN npm ci

# Copy source
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/
COPY apps/web/ ./apps/web/

EXPOSE 3001

CMD ["node", "apps/api/src/index.js"]
