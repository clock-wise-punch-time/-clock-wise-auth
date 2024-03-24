#!/bin/bash

keys_directory="${PWD}/security/keys"

if [ ! -d "$keys_directory" ]; then
    mkdir -p "$keys_directory"
fi

echo "🔑 Enter the passphrase to protect your keys:"
read -s passphrase

openssl genrsa -aes256 -passout pass:"$passphrase" -out "$keys_directory/private_key.pem" 2048
openssl rsa -in "$keys_directory/private_key.pem" -passin pass:"$passphrase" -pubout -out "$keys_directory/public_key.pem"

echo "🔐 Keys generated successfully in $keys_directory"
