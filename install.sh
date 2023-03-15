#!/bin/zsh
npm -f i
cd apps
cd claim-service && npm prune && npm -f i && cd ..
cd device-service && npm prune && npm -f i && cd ..
cd gateway && npm prune && npm -f i && cd ..
cd user-service && npm prune && npm -f i && cd ..
cd ../libs/core && npm prune && npm -f i
