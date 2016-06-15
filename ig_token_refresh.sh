#!/bin/bash

config="$(cat local.env.json)"
INSTAGRAM_CLIENT_ID=$(jq -r '.INSTAGRAM_CLIENT_ID' <<< $config)
INSTAGRAM_CLIENT_SECRET=$(jq -r '.INSTAGRAM_CLIENT_SECRET' <<< $config)
INSTAGRAM_REDIRECT_URI=$(jq -r '.INSTAGRAM_REDIRECT_URI' <<< $config)

echo "Getting you a code..."
open "https://api.instagram.com/oauth/authorize/?client_id=$INSTAGRAM_CLIENT_ID&redirect_uri=http://tashian.com/carl&response_type=code"

echo 'What code did you get?'
read code

echo "Here's your access token:"
curl -F "client_id=$INSTAGRAM_CLIENT_ID" \
 -F "client_secret=$INSTAGRAM_CLIENT_SECRET" \
 -F "grant_type=authorization_code" \
 -F "redirect_uri=$INSTAGRAM_REDIRECT_URI" \
 -F "code=$code" \
https://api.instagram.com/oauth/access_token

