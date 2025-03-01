# Build the Docker image
docker build -t milestone .

# Run the container
docker run -d --name milestone-admin --restart unless-stopped -p 3002:3000 milestone
