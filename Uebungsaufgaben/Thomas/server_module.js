const http = require('http');

// module aus anderen Dateien per require einer Variablen zuweisen 
const handle = require('./module/server_module_handle');

const server_module = http.createServer(handle);

server_module.listen(3000, () => {
    console.log('Server lauscht auf Port 3000.');
});