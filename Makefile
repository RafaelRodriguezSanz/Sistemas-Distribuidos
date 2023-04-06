clean:
	for /f "tokens=*" %i in ('docker images -aq') do docker rmi %i
	for /f "tokens=*" %i in ('docker ps -aq') do docker rm %i
	docker image prune -a -f
build:
	cd Backend/springboot && mvnw.cmd clean install package
start:
	net stop com.docker.service && net start com.docker.service
deploy:	
	docker-compose up
stop:
	docker-compose down
kill:
	net stop com.docker.service