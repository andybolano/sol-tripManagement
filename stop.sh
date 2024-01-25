#!/bin/bash
if [ "$(docker ps -q -f name=dockerize-vue-sol-trip-management)" ]; then
    docker stop dockerize-vue-sol-trip-management
    echo "Container stopped."
else
    echo "Container is not executing"
fi