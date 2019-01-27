#!/usr/bin/env bash

# ------
# Replaces the asset placeholders (e.g. [main.css]) with the versioned file names.
# ------

echo "Replacing asset versions..."

FILES=resources/tmp/dist/*
ASSETS=resources/tmp/dist/assets/*

for ASSET in $ASSETS
do
    VERSIONED=$(echo "$ASSET" | grep -o '[^\/]*$')
    NON_VERSIONED=$(echo "$VERSIONED" | perl -pe 's|(.*)(?:\.[^\.]{10,})((?:\.[^\.]{1,5})*)$|\1\2|')

    # Sanitise find/replace strings for SED.
    # See: http://stackoverflow.com/a/2705678
    FIND=$(echo "${NON_VERSIONED}" | sed -e 's/[]\/$*.^|[]/\\&/g')
    REPLACE=$(echo "${VERSIONED}" | sed -e 's/[\/&]/\\&/g')

    for FILE in $(find $FILES -type f -name \*.js);
    do
        if [[ $(uname -s) == "Linux" ]]; then
            sed -e 's/'"${FIND}"'/'"${REPLACE}"'/g' -i ${FILE}
        else
            sed -e 's/'"${FIND}"'/'"${REPLACE}"'/g' -i '' ${FILE}
        fi
    done

done
