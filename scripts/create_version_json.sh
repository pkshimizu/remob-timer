#!/bin/bash

today=$(date "+%Y%m%d_%H%M%S")
echo "{ \"version\": \"${today}\" }" > public/version.json

git add public/version.json