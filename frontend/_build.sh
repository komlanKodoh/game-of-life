#!/bin/bash

cd "$(dirname "$0")"

npm i --legacy-peer-deps && npx ng build && npx scully