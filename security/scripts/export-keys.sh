#!/bin/bash

publicKeyContent=$PUBLIC_KEY
privateKeyContent=$PRIVATE_KEY

rootDir=$(pwd)

echo "$publicKeyContent" > "$rootDir/security/keys/public_key.pem"
echo "$privateKeyContent" > "$rootDir/security/keys/private_key.pem"
