module.exports = {
    startJob: startJob,
    endJob: endJob,
    wyrOptions: wyrOptions
};

const { broadcast } = require("./ws.js");
var request = require("request");
const poll = require("./poll.js");
var currentWyrMessage;
var jobId;

function wyrOptions() {
    [_, a, b] = currentWyrMessage.match(/^[wW]ould you rather ([a-zA-Z0-9 \$\.-\/'"_]+) or ([a-zA-Z0-9 \$\.-\/'"_]+).*$/)
    return [a, b]
}

function setWyr(callback = function(_) {}) {
    request({
            method: 'GET',
            url: 'https://us-east4-dynamic-mystery-187118.cloudfunctions.net/wyr-bot'
        },
        function(error, response, body) {
            if (error) throw new Error(error);
            currentWyrMessage = body;
            module.exports.currentWyrMessage = currentWyrMessage;
            poll.startPoll();
            broadcast(currentWyrMessage);
            callback(currentWyrMessage);
        });
}

function startJob(callback = function(_) {}) {
    clearInterval(jobId);
    setWyr();
    jobId = setInterval(() => setWyr(callback), 900000);
    return jobId;
}

function endJob() {
    clearInterval(jobId);
}