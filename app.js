/*const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))*/


var express = require('express');
var SignalRJS = require('signalrjs');

var signalR = SignalRJS();

var server = express();
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
server.get('/', (req, res) => {res.send('Hello World!')});

server.use(signalR.createListener());
server.use(express.static(__dirname));
server.listen(3000);

signalR.on('CONNECTED', function() {
    console.log('connected');
    setInterval(function() {
        signalR.send({time: new Date()});
    }, 1000)
});
