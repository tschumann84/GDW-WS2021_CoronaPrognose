const http = require('http');
//Datei/Anwendung laden
//const handle = require('./server/handle');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hallo Node.js!');
});

const server = http.createServer(app);

server.listen(3000,() =>{
    console.log('Server listening on Port 3000.')
});