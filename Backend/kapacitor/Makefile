stop:
	echo "Stopping Old Containers"
	docker stop kapacitor-container

remove:
	echo "Removing Old Containers"
	docker rm kapacitor-container
	echo "Removing Old Images"
	docker rmi kapacitor-image
	echo "Removing Very-Old Images"
	docker image prune -a -f

build:
	echo "Building New Image"
	docker build -t kapacitor-image .

start:
	echo "Starting Containers"
	docker run -it -d -p 8086:8086 --name kapacitor-container kapacitor-image

ps:
	echo "Running Containers:"
	docker ps
