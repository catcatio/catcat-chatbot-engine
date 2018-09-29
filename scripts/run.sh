#!/bin/bash

ssh root@catcat.io "cd ~/gdh-bots && docker-compose down && docker-compose up --build -d"
