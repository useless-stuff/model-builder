FROM node:14-alpine as Base

FROM Base as Development
WORKDIR /service

FROM Base as Builder
WORKDIR /service
COPY . .
RUN ["yarn", "--cwd", "/service", "install"]
RUN ["yarn", "--cwd", "/service", "tsc" , "--skipLibCheck"]

FROM Base as Service
WORKDIR /service
ENV NODE_ENV=production
RUN apk add --no-cache nginx
RUN apk add --no-cache supervisor && rm -rf /tmp/* /var/cache/apk/*
COPY --from=Builder /service/docker/supervisord.conf /etc/supervisord.conf
COPY --from=Builder /service/docker/proxy.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /service/dist ./src
COPY --from=Builder /service/package.json ./
RUN ["yarn", "--cwd", "/service", "install"]

ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]

EXPOSE 80

ARG BUILD_VERSION
ARG BUILD_DATE
ARG BUILD_VCS_REF
ARG IMAGE_NAME
ENV BUILD_VERSION=${BUILD_VERSION} \
  BUILD_DATE=${BUILD_DATE} \
  BUILD_VCS_REF=${BUILD_VCS_REF}
LABEL "org.label-schema.build-date"=${BUILD_DATE} \
  "org.label-schema.version"=${BUILD_VERSION} \
  "org.label-schema.vcs-ref"=${BUILD_VCS_REF} \
  "org.model-builder-name"=${IMAGE_NAME}

