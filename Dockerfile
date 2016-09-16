# For now use the IDE Typescript compiler instead of tsc

FROM mhart/alpine-node:6.2.2

MAINTAINER Tim Thomas <tithomas@cisco.com>

WORKDIR /app

# ENV HTTP_PROXY "http://proxy.esl.cisco.com:8080"

# Initial seed files for NPM install
ADD ./package.json /app/package.json
# ADD ./typings.json /app/typings.json

# Account for the Cisco proxy (typings can get it from rc file in project directory)
# ADD ./.typingsrc /app/.typingsrc

# ENV NPM_CONFIG_LOGLEVEL info

RUN npm config set proxy http://proxy.esl.cisco.com:8080 && npm config set https-proxy http://proxy.esl.cisco.com:8080

# Install dependencies
RUN npm install --unsafe-perm=true

# Web server
RUN apk --no-cache add nginx curl
COPY conf.nginx /etc/nginx/nginx.conf
COPY default.nginx /etc/nginx/conf.d/default.conf

# Add the rest of the sources
ADD . /app

# RUN npm run tsc && chown -R nginx:nginx /app/*
RUN chown -R nginx:nginx /app/*

# nginx on 80
EXPOSE 80

# nginx can't be in daemon mode, otherwise container will exit immediately
# CMD ["nginx", "-g", "daemon off;"]
CMD ["nginx"]