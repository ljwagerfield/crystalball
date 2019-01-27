#!/usr/bin/env bash

# ------
# Moved into separate SH script (from package.json) due to being relatively
# low-level/granular, and because it's used in several places.
# ------

node -r babel-register ./node_modules/webpack/bin/webpack --display-error-details --config resources/config/webpack.config.browser.analyse.js
