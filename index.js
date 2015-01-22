#!/usr/bin/env node

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port = Number(process.env.PORT || 7777);
var cp = require('child_process').spawn;

app.use('/css', express.static(__dirname + '/client/css/'));
app.use('/js', express.static(__dirname + '/client/js/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/client.html');
});

/* socket.io event */
io.on('connection', function (socket) {
    console.log('user connected !');
    if (process.platform == "win32") {
        socket.on('pushPrev', function (data) {
            cp(__dirname + '/lib/WinSendKeys/WinSendKeys.exe',['-t','2000','-w','[ACTIVE]','{UP}']);
        })
        socket.on('pushNext', function (data) {
            cp(__dirname +'/lib/WinSendKeys/WinSendKeys.exe',['-t','2000','-w','[ACTIVE]','{DOWN}']);
        })
    } else if (process.platform == "darwin") {
        socket.on('pushPrev', function (data) {
            cp('osascript', ['-e', 'tell app \"System Events\" to key code 126']);
        })
        socket.on('pushNext', function (data) {
            cp('osascript', ['-e', 'tell app \"System Events\" to key code 125']);
        })
    }
})

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

server.listen(port, function(){
   console.log("copy this URL on your mobile device --> "+ addresses[0] + ':' + port);
});