#!/bin/bash

ssh root@catcat.io "mkdir -p ~/bots_performance"
rsync -Praz --delete --exclude=node_modules --exclude=.git --exclude=lib ../ root@catcat.io:~/bots_performance