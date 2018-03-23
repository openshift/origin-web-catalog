#!/bin/bash

set -e

# We don't need yarn to be installed globally for the system, so
# we can amend our path to look into the local node_modules for the
# correct binaries.
repo_root="$( dirname "${BASH_SOURCE}" )/.."
export PATH="${PATH}:${repo_root}/node_modules/.bin"

if which yarn > /dev/null 2>&1 ; then
  # In case upstream components change things without incrementing versions
  echo "Clearing yarn cache..."
  yarn cache clean
else
  echo "Skipping yarn cache clean, yarn not installed."
fi

echo "Cleaning up node_modules..."
rm -rf node_modules
