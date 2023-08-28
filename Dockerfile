# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . /app

# RUN npm run build

# EXPOSE 3000

# CMD npm run dev
# Stage 1: Build the application
FROM node:20-alpine AS build
WORKDIR /app

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json package-lock.json ./
RUN npm install

# Copy the rest of the application source code
COPY . /app

# Build the application
RUN npm run build

# Stage 2: Create a smaller image for production
FROM node:20-alpine
WORKDIR /app

# Copy only the built artifacts and the minimal dependencies
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
VOLUME [ "/app/node_modules", "/app/.next" ]

EXPOSE 3000
CMD npm run dev
