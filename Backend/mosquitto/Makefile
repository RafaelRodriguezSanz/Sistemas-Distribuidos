stop:
    echo "Stopping Old Containers"
    docker stop mosquito-container
remove:
	echo "Removing Old Containers"
    docker rm mosquito-container
    echo "Removing Old Images"
    docker rmi mosquito-image
    echo "Removing Very-Old Images"
    docker image prune -a -f
build:
    echo "Building New Image"
    docker build -t mosquito-image .

start:
    echo "Starting Containers"
    docker run -it -d -p 8080:8080 --name mosquito-container mosquito-image

ps:
	echo "Running Containers:"
    docker ps




