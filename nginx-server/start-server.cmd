echo "Stopping Old Containers" &
docker stop ngnix-server-container &
echo "Removing Old Containers" &
docker rm ngnix-server-container &
echo "Removing Old Images" &
docker rmi ngnix-server-image &
echo "Removing Very-Old Images" &
docker image prune -a -f &
echo "Building New Image" &
docker build -t ngnix-server-image . &
echo "Starting Containers" &
docker run -it -d -p 80:80 --name ngnix-server-container ngnix-server-image &
echo "Running Containers:" &
docker ps