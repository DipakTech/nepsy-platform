# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS build-stage
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# Copy Prisma schema to ensure 'prisma generate' works
COPY prisma ./prisma

# Install all dependencies including dev dependencies for build
RUN npm install

# Run Prisma generate to generate the client
RUN npx prisma generate

# Copy the rest of the application files and build the app
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine
WORKDIR /app

# Copy package.json and package-lock.json to install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy Prisma schema and generated client
COPY --from=build-stage /app/prisma ./prisma
COPY --from=build-stage /app/node_modules/.prisma ./node_modules/.prisma

# Copy the built app
COPY --from=build-stage /app/next.config.mjs ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public

# Set environment to production
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]
