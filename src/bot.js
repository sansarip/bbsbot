module.exports = {
    startBot: startBot,
    getClient: getClient,
    getChannel: getChannel
};

const tmi = require('tmi.js');
var wyr = require('./wyr.js');
const myWs = require('./ws.js');
const { default: request } = require('sync-request');
const { TWITCH_OAUTH } = require('./env.js');
const channel = "thebooboosousa"
const opts = {
    identity: {
        username: "booboosousabot",
        password: `${TWITCH_OAUTH}`
    },
    channels: [
        channel
    ]
};

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

function getClient() {
    return client;
}

function getChannel() {
    return channel;
}

function onMessageHandler(target, context, msg, self) {
    if (self) { return; }
    const commandName = msg.trim();
    // var beenCalled = false;

    // if (commandName === '!wyr') {
    //     wyr.startJob((wyrMessage) => {
    //         if (!beenCalled) {
    //             client.say(target, wyrMessage)
    //             beenCalled = true;
    //         }
    //     });
    // }
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function startBot() {
    client.connect();
}