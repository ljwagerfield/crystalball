#!/usr/bin/env bash

cd "$( dirname "${BASH_SOURCE[0]}" )"
cd ../../../
APP_DIR=$(pwd)/

if [[ -n "$1" ]]; then
    # Support the creation of stacks with specific domains.
    ARGUMENT="--domain $1"
fi

${NOTIFY_INF_DIR}web_app/deploy.sh $APP_DIR $ARGUMENT
