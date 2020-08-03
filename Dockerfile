#############
## Install ##
#############
FROM node:14.4.0 as install
#FROM images.artifactory.dunnhumby.com/node:14.4.0 as install

WORKDIR /app

COPY ./package.json .
# COPY ./package-lock.json .
RUN ["npm", "install"]

#################
## Copy Source ##
#################
FROM install as source
COPY . .

###########
## Build ##
###########
FROM source as build
RUN ["npm", "run", "build"]

##########
## Test ##
##########
FROM source as test
VOLUME ["/app/coverage", "/app/logs"]
RUN ["npm", "run", "test"]

#############
## Final ##
#############
#FROM nginx:1.19 as final
FROM build as final

# COPY ./util/default.conf.template /etc/nginx/conf.d/default.conf.template
# COPY --from=build /app/dist/ /usr/share/nginx/html
# EXPOSE 80
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;' 

COPY --from=build /app/dist/ ./
EXPOSE 3001
CMD ["node", "server.js"]
