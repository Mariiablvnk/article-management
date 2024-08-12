# Use the official Node.js image as a base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Run Prisma migrations
RUN npx prisma migrate deploy

# Run database seeding
RUN npx prisma db seed

# Build your Next.js application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
