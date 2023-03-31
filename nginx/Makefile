stop:
    echo "Stopping Old Containers"
    docker stop ngnix-container

remove:
	echo "Removing Old Containers"
    docker rm ngnix-container
    echo "Removing Old Images"
    docker rmi ngnix-image
    echo "Removing Very-Old Images"
    docker image prune -a -f

build:
    echo "Building New Image"
    docker build -t ngnix-image .

start:
    echo "Starting Containers"
    docker run -it -d -p 80:80 --name ngnix-container ngnix-image

ps:
	echo "Running Containers:"
    docker ps




