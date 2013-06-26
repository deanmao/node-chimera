#!/bin/sh

cd openssl
if [[ $OSTYPE = darwin* ]]; then
  ./Configure darwin64-x86_64-cc
else
  ./config
fi
make -j4
