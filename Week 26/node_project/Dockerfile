# Step 1: Base image
FROM node:18

# Step 2: Working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy app files
COPY . .

# Step 5: Expose port
EXPOSE 3000

# Step 6: Start app
CMD ["node", "index.js"]
