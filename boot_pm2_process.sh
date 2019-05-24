#!/bin/bash

DIR="/code/www/deploy/webroot"
MOBILE_NEXT_DIR="code/mobile-next"
ENVS=(1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 99)

pm2 kill

for env in ${ENVS[*]}; do
    dir=${DIR}/test${env}/${MOBILE_NEXT_DIR}
    cd ${dir}
    if [[ "$1" == "hard" ]]; then
        git reset --hard
        git checkout master
        git reset --hard origin/master
        rm -rf node_modules/ build/ .git/hooks/
        yarn
        TEST=${env} yarn build:test
    fi
    TEST=${env} yarn start:test
done

pm2 ls
