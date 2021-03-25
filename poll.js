module.exports = {
    startPoll: startPoll
}

var request = require("request");
const bot = require('./bot.js');
const { STRAWPOLL_KEY } = require("./env.js");
const wyr = require('./wyr.js')
var strawPollId;
const strawPollKey = `${STRAWPOLL_KEY}`

function startPoll(duration = 120000) {
    var client = bot.getClient();
    var channel = bot.getChannel();
    wyrQuestion = wyr.currentWyrMessage;
    [a, b] = wyr.wyrOptions();
    request(
        {
            method: 'POST',
            url: `https://strawpoll.com/api/poll`,
            headers: {
                "content-type": "application/json",
                "API-KEY": strawPollKey
            },
            json: {
                "poll": {
                    "title": wyrQuestion,
                    "answers": [`#A ${a}`, `#B ${b}`]
                }
            }
        },
        function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            strawPollId = body.content_id;
            client.say(channel, `Poll started at https://strawpoll.com/${strawPollId}, answers will be collected in ${duration/60000} minute(s)!`)
        });
    setTimeout(() => {
        getStrawPollResults()
    }, duration)
}

function getStrawPollResults(pollId = strawPollId) {
    var client = bot.getClient()
    request(
        {
            method: 'GET',
            url: `https://strawpoll.com/api/poll/${pollId}`,
            headers: {"API-KEY": strawPollKey}
        },
        function (error, response, body) {
            if (error) throw new Error(error);
            json = JSON.parse(body);
            [a, b] = json.content.poll.poll_answers;
            client.say(bot.getChannel(), `${a.answer}: ${a.votes} votes ${b.answer}: ${b.votes} votes`)
        });
}


