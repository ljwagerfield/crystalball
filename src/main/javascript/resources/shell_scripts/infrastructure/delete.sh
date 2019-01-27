#!/usr/bin/env bash

cd "$( dirname "${BASH_SOURCE[0]}" )"
cd ../../../
APP_DIR=$(pwd)/

${NOTIFY_INF_DIR}web_app/deploy.sh $APP_DIR --domain "$1" --delete
