#!/bin/bash

cd "$(dirname "$0")"

./server/build.sh &&
./frontend/build.sh &&
docker build . -t game-of-life