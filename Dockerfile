
FROM node:16

RUN mkdir /game-of-life/
WORKDIR /game-of-life/

COPY ./frontend/build/ ./public

COPY ./server ./server

RUN apt-get update || : && apt-get install python -y
RUN npm config set python /usr/bin/python
RUN cd server && npm i --production && npm rebuild bcrypt --build-from-source ;

COPY ./cmd/start.sh ./

ENTRYPOINT ["sh", "/game-of-life/cmd/start.sh" ]

