#!/bin/bash

# Download the 0.19.1 binary for Linux
curl -L -o elm.gz https://github.com/elm/compiler/releases/download/0.19.1/binary-for-linux-64-bit.gz

# Decompress `elm.gz`
gunzip elm.gz

# Mark `elm` as executable
chmod +x elm

# Move the `elm` binary to one of the directories listed in your `PATH`
sudo mv elm /usr/local/bin/

# Run the elm binary
elm --help
