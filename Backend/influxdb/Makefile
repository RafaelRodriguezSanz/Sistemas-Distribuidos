stop:
	echo "Stopping Old Containers"
	docker stop influxdb-container

remove:
	echo "Removing Old Containers"
	docker rm influxdb-container
	echo "Removing Old Images"
	docker rmi influxdb-image
	echo "Removing Very-Old Images"
	docker image prune -a -f

build:
	echo "Building New Image"
	docker build -t influxdb-image .

start:
	echo "Starting Containers"
	docker run -it -d -p 8086:8086 --name influxdb-container influxdb-image

ps:
	echo "Running Containers:"
	docker ps