FROM node:14-alpine as Builder
ARG WORKDIR=/service
WORKDIR ${WORKDIR}
COPY . .
RUN ["yarn", "--cwd" , "/service", "install"]
RUN ["yarn", "--cwd" , "/service", "build"]

FROM nginx:1.17-alpine as Service
ARG WORKDIR=/service
WORKDIR ${WORKDIR}
COPY ./docker/nginx.conf /etc/nginx/
COPY --from=Builder ${WORKDIR}/build /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
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
  "org.model-builder.image-name"=${IMAGE_NAME}