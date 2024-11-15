# Stage 1: Install dependencies
FROM node:20-alpine AS build-stage
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . . 
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

# Install necessary dependencies for Puppeteer in the production stage
RUN apk add --no-cache \
    libc6-compat \
    libstdc++ \
    bash \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Copy all files from build-stage to be used in production
WORKDIR /app
COPY --from=build-stage /app/package*.json ./ 
COPY --from=build-stage /app/next.config.mjs ./ 
COPY --from=build-stage /app/.next ./.next 
COPY --from=build-stage /app/public ./public 
COPY --from=build-stage /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD ["npm", "start"]
