#!/bin/bash

cd "$(dirname "$0")" && cd ..

pwd

./server/_build.sh &&
./engine-interface/_build.sh &&
./frontend/_build.sh

docker build . -t game-of-life