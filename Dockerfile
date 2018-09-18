FROM node:8-alpine
ENV NODE_ENV develop
RUN mkdir -p /usr/app && \
  npm i -g nodemon

WORKDIR /usr/app
VOLUME ["/usr/app"]