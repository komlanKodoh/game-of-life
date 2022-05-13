#!/bin/bash

cd "$(dirname "$0")"

npm i --save --legacy-peer-deps && npx ng build && npx scully