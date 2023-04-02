

### container re-build and run
```sh
docker compose up --build 
```


```shell
# rum rabbitMQ server
docker compose -f rabbitmq.yml up
```


### List of images

```sh
# docker image list
docker image list
docker images


# docker image delete
docker image rm image id

# Delete all Image
docker rmi -f $(docker images -a -q)
docker rm -vf $(docker ps -a -q)

```

### List of container

```sh
docker container list
docker containers


docker run --rm -d -p [hostPort]:[DAppPort] [imageName]
docker run -d -p 8020:80 nginx


docker container stop [container_id]

# stop all container
docker stop $(docker ps -a -q)


# delete all container
docker container rm -f $(docker ps -a -q)


```



### See current running container

```sh
docker ps

# all docker container 
docker ps -a       


docker rm -vf $(docker ps -a -q)

Delete all volume
docker volume rm $(docker volume ls -q)

//force
docker rm -f $(docker ps -a -q)



```





