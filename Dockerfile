# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy application files
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]