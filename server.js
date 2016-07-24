var http = require('http');
var fs = require('fs');
var url = require('url');
var WebSocketServer = require("websocket").server;
var pageMap = {'/join':'join', '/create':'create'}; // "/": "./index.html"

var User = function (name, type, value) {
    this.name = name;
    this.type = type;
    this.value = value;
}

var Block = function (code, msg) {
    this.code = code;
    this.msg = msg;
}

var team = {
    master : {},
    member : []
}

var teams = {};
function createTeam(teamName, masterName) {
    if (teams[teamName]) {
        console.log('Team already exists');
        return new Block(404, 'Team already exists');
    }
    teams[teamName] = {
        master : new User(masterName, 'MASTER', undefined),
        member : []
    };
    return new Block(200, 'Team created Succcessfully');
}

function deleteTeam(teamName) {
    if (teams[teamName]) {
        teams[teamName] = undefined;
        return new Block(200, 'Team deleted');
    } else {
        return new Block(404, 'Team not found');
    }
}

function addMemeber(teamName, user) {
    var team = teams[teamName];

    if (team) {
        var members = team.member;
        for (var i in members) {
            if (members[i].name == user.name) {
                console.log('User already exists');
                return new Block(404, 'Memeber already exists for this user');
            }
        }
        team.member.push(user);
        // update status to master
        return new Block(200, 'User has been added to the team');
    } else
        return new Block(404, 'Team not found');
}

function doPoll(teamName, memberName, pollValue) {
    var team = teams[teamName];
    if (team) {
        var members = team.member;
        for (var i in members) {
            if (members[i].name == memberName) {
                members[i].value = pollValue;
                return new Block(200, 'Poll value added for ' + memberName);
            }
        }
    }
}

function restAllMemebers(teamName) {
    var team = teams[teamName];
    if (team) {
        var members = team.member;
        for (var i in members) {
            members[i].value = undefined;
        }
    }
}


var server = http.createServer(function (request, response) {
    console.log("Got request " + request.url);
    if (request.url == '/images/favicon.png') response.end();
    var path = pageMap[request.url];
    if (path) {
        if (path == "join") {
            request.on('data', function (data) {
                console.log("Data : ", JSON.parse(data));
                response.end(JSON.stringify({}));
            });
        }else if (path == "create"){
            request.on('data', function (data) {
                console.log("Data : ", JSON.parse(data));
                response.end(JSON.stringify({ }));
            });
        }
    }else{
        fs.readFile("./index.html", function (err, data) {
            if (err) console.log(err);
            response.end(data);
        });
    }
});

server.listen(8092, function () {
    console.log("server is listening to the port 8092");
});
