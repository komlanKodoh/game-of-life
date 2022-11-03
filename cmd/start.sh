#!/bin/bash


cd "$(dirname "$0")"

export PUBLIC_DIR='/game-of-life/public';

node ./server/build/main/app.js
