
FROM node:8-alpine3.9

RUN mkdir /game-of-life/
WORKDIR /game-of-life/

COPY ./frontend/build/ ./public

COPY ./server ./server
RUN cd server && npm i --production ;

COPY ./_start.sh ./

ENTRYPOINT ["sh", "/game-of-life/_start.sh" ]

