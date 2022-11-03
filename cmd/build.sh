#!/bin/bash

cd "$(dirname "$0")"

./server/cmd/build.sh &&
./engine-interface/cmd/build.sh &&
./frontend/cmd/build.sh

docker build . -t game-of-life