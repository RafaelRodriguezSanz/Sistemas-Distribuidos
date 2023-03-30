echo "Stopping Old Containers" &
docker stop influxdb-server-container &
echo "Removing Old Containers" &
docker rm influxdb-server-container &
echo "Removing Old Images" &
docker rmi influxdb-server-image &
echo "Removing Very-Old Images" &
docker image prune -a -f &
echo "Building New Image" &
docker build -t influxdb-server-image . &
echo "Starting Containers" &
docker run -it -d -p 8086:8086 --name influxdb-server-container influxdb-server-image &
echo "Running Containers:" &
docker ps