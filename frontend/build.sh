#!/bin/bash

cd "$(dirname "$0")"

npm i && ng build && npx scully