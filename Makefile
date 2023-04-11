clean:
	docker builder prune -a -f & for /f "tokens=*" %%i in ('docker images -aq') do docker rmi -f %%i & for /f "tokens=*" %%i in ('docker ps -aq') do docker rm -f %%i & for /f "tokens=*" %%i in ('docker volume ls -q') do docker volume rm -f %%i & docker image prune -a -f
build:
	cd Backend/springboot && mvnw.cmd clean install package
initialize:
	"C:/Archivos de Programa/Docker/Docker/Docker Desktop.exe"
start:
	net stop com.docker.service && net start com.docker.service
deploy:	
	docker-compose up
stop:
	docker-compose down
kill:
	net stop com.docker.service
all:
	make start & make build & make clean & make deploy