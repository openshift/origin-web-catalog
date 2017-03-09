#!/bin/bash

set -e

STARTTIME=$(date +%s)

TMPDIR="${TMPDIR:-"/tmp"}"
LOG_DIR="${LOG_DIR:-$(mktemp -d ${TMPDIR}/openshift.assets.logs.XXXX)}"

function cmd() {
  local cmd="$1"
  local tries="${2:-1}"
  local log_file=$(mktemp ${LOG_DIR}/install-assets.XXXX)
  echo "[install-assets] ${cmd}"
  rc="0"
  while [[ "$tries" -gt 0 ]]; do
    rc="0"
    $cmd &> ${log_file} || rc=$?
    [[ "$rc" == "0" ]] && return 0
    ((tries--))
  done
  echo "[ERROR] Command '${cmd}' failed with rc ${rc}, logs:" && cat ${log_file}
  exit $rc
}

repo_root="$( dirname "${BASH_SOURCE}" )/.."

# Install bower if needed
if ! which bower > /dev/null 2>&1 ; then
  cmd "npm install bower"
fi

cmd "npm install --unsafe-perm"

# In case upstream components change things without incrementing versions
cmd "bower cache clean --allow-root"
cmd "bower update --allow-root" 3

ret=$?; ENDTIME=$(date +%s); echo "$0 took $(($ENDTIME - $STARTTIME)) seconds"; exit "$ret"
