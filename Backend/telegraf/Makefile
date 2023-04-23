stop:
	echo "Stopping Old Containers"
	docker stop telegraf-container

remove:
	echo "Removing Old Containers"
	docker rm telegraf-container
	echo "Removing Old Images"
	docker rmi telegraf-image
	echo "Removing Very-Old Images"
	docker image prune -a -f

build:
	echo "Building New Image"
	docker build -t telegraf-image .

start:
	echo "Starting Containers"
	docker run -it -d -p 8086:8086 --name telegraf-container telegraf-image

ps:
	echo "Running Containers:"
	docker ps
