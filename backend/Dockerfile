# Stage 1: Build the TypeScript application
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the compiled application code from the previous stage
COPY --from=build /app/dist /app/dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port 8000 (or the port your Express app uses)
EXPOSE 8000

# Start the application
CMD ["node", "dist/index.js"]
