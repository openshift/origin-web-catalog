#!/bin/bash

set -e

npm run build

echo "Verifying that checked in built files under dist match the source..."
if [[ $(git status -s -u dist*) ]]; then
    git status -vv -u dist*
    echo "Built dist does not match what is committed, run 'npm run build' and include the results in your commit."
    exit 1
else
    echo "Verified."
fi
