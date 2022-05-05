#!/bin/bash

cd "$(dirname "$0")"

npm i --production && 
npm run build 