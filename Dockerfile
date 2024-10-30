FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install -g expo-cli
RUN npm install

COPY . .

# Expose the new port 8081 for Expo
EXPOSE 8081

# Start the app with npm start
CMD ["npm", "start"]