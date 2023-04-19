stop:
    echo "Stopping Old Containers"
    docker stop springboot-producer-container

remove:
	echo "Removing Old Containers"
    docker rm springboot-producer-container
    echo "Removing Old Images"
    docker rmi springboot-producer-image
    echo "Removing Very-Old Images"
    docker image prune -a -f

build:
    echo "Building New Image"
    docker build -t springboot-producer-image .

start:
    echo "Starting Containers"
    docker run -it -d -p 8080:8080 --name springboot-producer-container springboot-producer-image

ps:
	echo "Running Containers:"
    docker ps




