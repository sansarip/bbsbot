module.exports = {
    expressWs: expressWs,
    initWsServer: initWsServer,
    broadcast: broadcast
};

var expressWs;

// Clean up dead ws connections
// setInterval(() => {
//     expressWs.getWss().clients.forEach(ws => {
//         if (!ws.isAlive) return ws.terminate();
//     });
// }, 10000);

function initWsServer(app) {
    expressWs = require('express-ws')(app);
    return expressWs;
}

function broadcast(message) {
    expressWs.getWss().clients.forEach(ws => {
        ws.send(message);
    });
}