#!/bin/bash

cd /home/typo/

sudo nodemon /home/typo/bucket/server.js --watch ./bucket --watch ./bucket/app/*
