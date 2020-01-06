#!/bin/bash -e
# root
env=$1
export PATH=$PATH:/usr/local/nodejs/bin:/usr/sbin

echo "[startup step 1] ttt5-group6-mall start startup.sh"
echo '[node -v] '`node -v`
echo '[npm -v] '`npm -v`
echo '[current user] '`whoami`

# attention five star:
# git project name maybe uppercase, but here must be set lowercase
# because the uda deployment set project name always to lowercase
PROJECT_NAME=ttt5-group6-mall/apiserver

# 判断环境local本地，prod生产
if [ "$env" = "" ];
  then
    echo "[Error] the start.sh need a environment argument"
    echo "[Maybe] the argument must be one of them [ local / prod ]"
    exit 1
fi

# 分环境配参数
if [ "$env" = "prod" ];
  then
    echo "[Info] the start.sh run in a prod environment argument"
    NODE_ROOT=/usr/local/node
    PROJECT_ROOT=$NODE_ROOT/$PROJECT_NAME
    LOG_ROOT=$NODE_ROOT/logs/$PROJECT_NAME
    cd $PROJECT_ROOT
    mkdir -p $LOG_ROOT
    export NODE_ENV="production"
elif [ "$env" = "local" ];
  then
    export NODE_ENV="development"
    echo "[Info] the start.sh run in a local environment argument"
else
  echo "[error] the start.sh need a environment argument only [ local / prod ]"
  exit 1
fi

echo '[startup step 2] echo something...'
echo "NODE_ROOT: ${NODE_ROOT}"
echo "PROJECT_NAME: ${PROJECT_NAME}"
echo "PROJECT_ROOT: ${PROJECT_ROOT}"
echo "LOG_ROOT: ${LOG_ROOT}"
echo "Run env: ${env}"
echo 'user: '`whoami`
echo 'npm -v:'`npm -v`
echo 'node -v:'`node -v`

echo "[startup step 3] export NODE_ENV=${NODE_ENV} EGG_SERVER_ENV=${env}"
export EGG_SERVER_ENV=${env}

npm cache clean --force
npm install --registry=https://registry.npm.taobao.org --verbose
npm run stop

echo "[Sequlize] database init..."
npm run db:init

echo "[Sequlize] database seed..."
npm run seed:test

npm run start

echo "[Success] Server is running..."
