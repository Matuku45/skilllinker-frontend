# Stage 1: build the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: serve static files
FROM pierrezemb/gostatic

# Copy the built files
COPY --from=build /app/dist /srv/http/

EXPOSE 8080

CMD ["-port", "8080", "-https-promote", "-enable-logging"]
