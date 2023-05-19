stop:
	echo "Stopping Old Containers"
	docker stop chronograf-container

remove:
	echo "Removing Old Containers"
	docker rm chronograf-container
	echo "Removing Old Images"
	docker rmi chronograf-image
	echo "Removing Very-Old Images"
	docker image prune -a -f

build:
	echo "Building New Image"
	docker build -t chronograf-image .

start:
	echo "Starting Containers"
	docker run --network=default -it -d -p 8888:8888 --name chronograf chronograf-image

ps:
	echo "Running Containers:"
	docker ps
