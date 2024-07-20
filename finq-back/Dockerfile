# Use a specific version of node as the base image
FROM node:16-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the project
RUN npm run build

# Multi-stage build to keep the image size small
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD [ "node", "dist/index.js" ]
