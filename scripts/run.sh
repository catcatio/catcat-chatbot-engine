#!/bin/bash

ssh root@catcat.io "cd ~/bots_performance && docker-compose down && docker-compose up --build -d"
