clean:
	docker builder prune -a -f & for /f "tokens=*" %%i in ('docker images -aq') do docker rmi -f %%i & for /f "tokens=*" %%i in ('docker ps -aq') do docker rm -f %%i & for /f "tokens=*" %%i in ('docker volume ls -q') do docker volume rm -f %%i & docker image prune -a -f & docker network prune -f
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
	rmdir Kubernates || mkdir Kubernates && copy docker-compose.yaml Kubernates/docker-compose.yaml && cd Kubernates && kubectl config use-context docker-desktop && kompose convert -f docker-compose.yaml && kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml && kubectl apply -f . --validate=false && kubectl get pods && kubectl -n kube-system get secret && kubectl proxy && start http://127.0.0.1:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login && kubectl apply -f ./service-account.yaml && kubectl apply -f ./role-binding.yaml && kubectl -n kubernetes-dashboard create token admin-user
kubernates-clean:
	kubectl delete pods --all --all-namespaces && kubectl delete services --all --all-namespaces && kubectl delete deployments --all --all-namespaces && 