const http = require('http');

/* Express per require einbinden
* express install per npm aus node.js mit "npm install express", beachte das aktuelle Verzeichnis der Installation
* Installation erzeugt "node_modules" Ordner unter dem alle Module die express benötigt und sich selbst installiert werden.
*/ 
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hallo Node.js! [mit express]');
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server lauscht auf Port 3000');
});