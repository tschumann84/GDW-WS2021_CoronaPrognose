const handle = function(req, res) {
    res.writeHead(200, {
        'content-type': 'text/html' 
    });
    res.write('Hallo Node.js! [aus ./module/server_module_handle.js]');
    res.end();
};

// Funktionen sind Grundsätzlich Privat und müssen für ihre externe Verwendung exportiert werden
module.exports = handle;