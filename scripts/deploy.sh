#!/bin/bash

ssh root@catcat.io "mkdir -p ~/gdh-bots"
rsync -Praz --delete --exclude=node_modules --exclude=.git --exclude=lib ../ root@catcat.io:~/gdh-bots