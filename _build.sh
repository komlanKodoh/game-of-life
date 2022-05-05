#!/bin/bash

cd "$(dirname "$0")"

./server/_build.sh &&

./engine-interface/_build.sh &&
./frontend/_build.sh &&

docker build . -t game-of-life