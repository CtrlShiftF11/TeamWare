FROM dockerfile/nodejs
ADD . /app
WORKDIR /app
RUN npm install node-gyp -g
RUN npm install
