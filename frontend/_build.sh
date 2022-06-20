#!/bin/bash

cd "$(dirname "$0")"

npm i && npx ng build && npx scully