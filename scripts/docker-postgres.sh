  
#!/bin/bash

docker stop postgres
docker rm postgres
docker run -d \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=myweight \
  --name postgres \
  -p 5433:5432 \
  --restart=always \
  images.artifactory.dunnhumby.com/postgres:12