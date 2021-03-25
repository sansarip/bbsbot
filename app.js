const express = require('express');
var myWs = require('./ws.js');
var wyr = require('./wyr.js');
const bot = require("./bot.js")
bot.startBot()

const port = 3000;
var expressWs = myWs.initWsServer(express())
const app = expressWs.app;
app.use(express.json());
app.use(express.static('public'))

var is_live = false;

app.ws('/wyr', (ws, req) => {
    console.log(`${new Date()} New ws connection request!`);
    console.log(wyr.currentWyrMessage);
    ws.on('message', _msg => {
        if (wyr.currentWyrMessage) {
            ws.send(wyr.currentWyrMessage);
        }
    });
})

// Job starts when stream goes live and ends when stream ends via webhooks
app.post('/wyr/job', (req, res) => {
    console.log(`${new Date()} Webhook message received:\n`, req.body);
    var data = req.body.data;
    if (!data || data.length == 0) {
        console.log(`${new Date()} Ending wyr job`);
        wyr.endJob();
        is_live = false;
    }
    // else if (data[0].type && !is_live) {
    //     console.log(`${new Date()} Starting wyr job`);
    //     wyr.startJob();
    //     is_live = true;
    // }
    res.send();
})

// Respond to Twitch Hub challenge
app.get('/wyr/job', (req, res) => {
    console.log(`${new Date()} `, req.query);
    res.send(req.query["hub.challenge"]);
})

app.listen(port, '0.0.0.0', () => {
    console.log(`${new Date()} App listening at http://0.0.0.0:${port}`);
})