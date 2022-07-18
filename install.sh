#!/bin/zsh
npm -f i
cd apps
cd claim-service && npm -f i && cd ..
cd device-service && npm -f i && cd ..
cd gateway && npm -f i && cd ..
cd user-service && npm -f i && cd ..
cd ../libs/core && npm -f i
