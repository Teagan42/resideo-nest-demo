#!/bin/zsh
npm i
cd apps
cd claim-service && npm i && cd ..
cd device-service && npm i && cd ..
cd gateway && npm i && cd ..
cd user-service && npm i && cd ..
cd ../libs/core && npm i
