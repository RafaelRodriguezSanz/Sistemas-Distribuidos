clean:
	rm -r Kube && docker builder prune -a -f & for /f "tokens=*" %%i in ('docker images -aq') do docker rmi -f %%i & for /f "tokens=*" %%i in ('docker ps -aq') do docker rm -f %%i & for /f "tokens=*" %%i in ('docker volume ls -q') do docker volume rm -f %%i & docker image prune -a -f & docker network prune -f
build:
	cd Backend/springboot-consumer && mvnw.cmd clean install package
	cd Backend/springboot-producer && mvnw.cmd clean install package
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
	make start && make clean & make build & make deploy
kubernates:
	mkdir Kube && copy ./docker-file.yaml ./Kube/docker-file.yaml && cd Kube && kompose convert -f docker-compose.yaml && kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml && minikube start && kubectl apply -f . && kubectl apply -f . && kubectl get po && kubectl -n kube-system get secret && kubectl proxy
