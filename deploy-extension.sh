#!/usr/bin/env bash
rm rick-roulette.zip
find . -name "*.un~" -exec rm -rf {} \;
zip -r rick-roulette.zip extension/* -x "*.DS_Store"

#TODO: Figure out how to deploy to chrome developer dashboard via api
