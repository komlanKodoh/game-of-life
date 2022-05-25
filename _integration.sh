

docker-compose up -d  &&
sleep 4 &&
curl http://localhost:3000 &&
docker-compose kill -s SIGINT