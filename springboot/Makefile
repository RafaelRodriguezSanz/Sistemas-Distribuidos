stop:
    echo "Stopping Old Containers"
    docker stop springboot-container

remove:
	echo "Removing Old Containers"
    docker rm springboot-container
    echo "Removing Old Images"
    docker rmi springboot-image
    echo "Removing Very-Old Images"
    docker image prune -a -f

build:
    echo "Building New Image"
    docker build -t springboot-image .

start:
    echo "Starting Containers"
    docker run -it -d -p 8080:8080 --name springboot-container springboot-image

ps:
	echo "Running Containers:"
    docker ps




