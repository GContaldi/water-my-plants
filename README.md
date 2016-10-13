# water-my-plants
Automated watering system controlled via Arduino using Socket.io


## Setup Docker
1. Install [Docker Toolbox](https://www.docker.com/products/docker-toolbox)
2. Create a Docker machine `docker-machine create --driver virtualbox --virtualbox-memory 2048 --virtualbox-cpu-count=4 docker-dev`

## Run Docker
1. Start docker machine (if is not already started): `docker-machine start docker-dev`
2. Run: `docker-machine env docker-dev`
3. Run: `eval $(docker-machine env docker-dev)`
4. Run: `docker-compose up`
5. Get the ip of your machine with `docker-machine ip docker-dev`

