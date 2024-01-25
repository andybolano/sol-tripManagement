#!/bin/bash
#chmod +x start.sh

if [ "$(docker ps -q -f name=dockerize-vue-sol-trip-management)" ]; then
    echo "Image already is executing"
else
    docker rm dockerize-vue-sol-trip-management
    docker run -p 8082:8082 --name dockerize-vue-sol-trip-management -d sol-trip-management
fi