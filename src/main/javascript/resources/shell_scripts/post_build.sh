#!/usr/bin/env bash

# ------
# Run after building and packaging.
# ------

echo "Executing post-build tasks... "

./resources/shell_scripts/replace_asset_placeholders.sh
