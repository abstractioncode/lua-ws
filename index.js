var WebSocketServer = require('ws').Server;
var http = require('http');
const handler = require('./CommandHandler/index.js');
const setup = require('./Database/index.js');
setup();
const {LogInfo, LogWarn, LogError} = require('./Modules/Logger/index.js');
var server = http.createServer(
);
var wss = new WebSocketServer({server: server
});

wss.on('connection', function(ws,req) {
    const headers = req.headers;
        LogInfo(`${new Date()} ${headers?.username} connected`);
    ws.on('close', function() {
        LogInfo(`${new Date()} ${headers?.username} disconnected`);
    });
    ws.on('message', function(message) {
        LogInfo(`${new Date()} ${headers?.username} sent: ${message}`);
        handler(headers,message,ws);
    });
    ws.on('error', function(e) {
        LogError(`${new Date()} ${headers?.username} error: ${e}`);
    });  
});

server.listen(8126, () => {
  console.log('listening on port 8126');
});