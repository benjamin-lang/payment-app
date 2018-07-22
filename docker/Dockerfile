FROM nginx:1.14.0-alpine-perl

# default command outputs the image info file
CMD ["cat", "/IMAGE_INFO"]

# no entrypoint set
ENTRYPOINT []

# exposed port
EXPOSE 80

# copy local folders to docker container
COPY . /