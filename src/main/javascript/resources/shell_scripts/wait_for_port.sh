#!/usr/bin/env bash
echo Waiting for port $1
while ! nc -vz localhost $1 &> /dev/null; do sleep 0.1; done
