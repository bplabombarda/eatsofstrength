# Image
FROM mhart/alpine-node:14

USER node

# Vars
ARG ENV=${ENV:-dev}

# Copy / Move Files
WORKDIR /app
COPY . /app
RUN cd /app

# Dependencies / Build
RUN npm ci
RUN npm run build

# Start Up
EXPOSE 8080
CMD npm run start:${ENV}
