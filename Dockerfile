FROM dockerfile/nodejs
ADD . /app
WORKDIR /app
RUN npm install
RUN npm install -g nodemon
