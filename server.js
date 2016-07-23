var http = require('http');
var fs = require('fs');
var url = require('url');
var WebSocketServer = require("websocket").server;

var server = http.createServer(function (request, response) {
    console.log("Got request " + request.url);

});

server.listen(8092, function () {
    console.log("server is listening to the port 8092");
});
