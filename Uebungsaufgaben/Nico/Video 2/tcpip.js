const net = require('net');

const server = net.createServer(socket =>{
    socket.write('Hallo TCP/IP!');
    socket.end();
});

server.listen(3000);
//Zugriff per telnet oder nc