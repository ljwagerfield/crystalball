#!/usr/bin/env bash

# ------
# Moved into separate SH script (from package.json) due to being relatively
# low-level/granular, and because it's used in several places.
# ------

if [[ $SERVER_TYPE = "express" || $SERVER_TYPE = "lambda" ]]; then
    node -r babel-register ./node_modules/webpack/bin/webpack --display-error-details --config resources/config/webpack.config.server.$SERVER_TYPE.js
else
    echo "ERROR! Please put 'SERVER_TYPE=express' or 'SERVER_TYPE=lambda' before the npm command."
    exit 1 # error
fi
