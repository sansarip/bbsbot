# bbsbot
A Twitch bot for thebooboosousa channel

Migrating to https://github.com/sansarip/bbsbot-cljs

## Prerequisites
1. NPM
2. Node

## Setup
```shell
cd bbsbot
node install
```

Make sure you have the necessary env vars located in `env.js` defined before running.

## Docker

```shell
docker build . -t sansarip/bbsbot:latest
# You should also set the necessary env vars with -e
docker run -p 3000:3000 -d --rm --name bbsbot sansarip/bbsbot:latest
```

## Node REPL

```node
cd src
node
.load repl.js
wyr.startJob()
```

## Server

```shell
node src/app.js
```
