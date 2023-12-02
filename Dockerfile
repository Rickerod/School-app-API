# Base image
FROM node:latest

# Create app directory 
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY .env /app
COPY src /app/src

RUN npm install

#Expose port and start application
EXPOSE 3000
CMD [ "node", "src/index.js" ]