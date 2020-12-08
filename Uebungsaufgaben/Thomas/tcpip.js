const { Socket } = require('dgram');
const net = require('net');

const server = net.createServer(Socket => {
    Socket.write("Hallo TCP/IP \n");
    Socket.end();
});

server.listen(3000, () => {
    console.log("Server lauscht auf Port 3000.");
});
