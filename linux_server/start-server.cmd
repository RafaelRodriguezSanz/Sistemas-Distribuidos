echo "Stopping Old Containers" &
docker stop linux-server-container &
echo "Removing Old Containers" &
docker rm linux-server-container &
echo "Removing Old Images" &
docker rmi linux-server-image &
echo "Removing Very-Old Images" &
docker image prune -a -f &
echo "Building New Image" &
docker build -t linux-server-image . &
echo "Starting Containers" &
docker run -it -d -p 8080:8080 --name linux-server-container linux-server-image &
echo "Running Containers:" &
docker ps