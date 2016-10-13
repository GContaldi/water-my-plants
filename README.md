# water-my-plants
Automated watering system controlled via Arduino using Socket.io

## Docker 

### Setup Docker
1. Install [Docker Toolbox](https://www.docker.com/products/docker-toolbox)
2. Create a Docker machine `docker-machine create --driver virtualbox --virtualbox-memory 2048 --virtualbox-cpu-count=4 docker-dev`

### Run Docker
1. Start docker machine (if is not already started): `docker-machine start docker-dev`
2. Run: `docker-machine env docker-dev`
3. Run: `eval $(docker-machine env docker-dev)`
4. Run: `docker-compose up` or `docker-compose up -d` to avoid less verbose output
5. Get the ip of your machine with `docker-machine ip docker-dev`

### Connect to a Docker Container
1. `docker ps`
2. Get the container_id
2. Run: `docker exec -i -t container_id /bin/bash`

## Arduino

This project is based on Arduino YUN

### Getting Start
1. Download [Arduino IDE](https://www.arduino.cc/en/Main/Software) based on your OS
2. Open Arduino YUN and set Arduino YUN as a board (Boards->Arduino Yun)
3. Import PubSubClient library: Sketch->Include Library->Manage Libraries

### Helpful Links 
* [Getting start with Arduino YUN](http://wiki.linino.org/doku.php?id=wiki:basicconfiguration)
