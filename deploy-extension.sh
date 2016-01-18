#!/usr/bin/env bash
rm git-draw.zip
find . -name "*.un~" -exec rm -rf {} \;
zip -r git-draw.zip extension/* -x "*.DS_Store"

#TODO: Figure out how to deploy to chrome developer dashboard via api
